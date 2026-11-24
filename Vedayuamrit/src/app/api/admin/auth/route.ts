import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SESSION_COOKIE = 'va_admin_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function hash(value: string) {
  return createHash('sha256').update(value).digest();
}

function safeEqual(left: string, right: string) {
  return timingSafeEqual(hash(left), hash(right));
}

function getAuthConfig() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!email || !password || !sessionSecret || sessionSecret.length < 32) {
    return null;
  }

  return { email, password, sessionSecret };
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  return (
    origin === request.nextUrl.origin ||
    origin === process.env.DASHBOARD_ORIGIN
  );
}

function getCorsHeaders(request: NextRequest) {
  const origin = request.headers.get('origin');
  const headers = new Headers({
    'Cache-Control': 'no-store',
    Vary: 'Origin',
  });

  if (origin && isAllowedOrigin(request)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Credentials', 'true');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
  }

  return headers;
}

function jsonResponse(request: NextRequest, body: object, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: getCorsHeaders(request),
  });
}

function getSameSite() {
  return process.env.ADMIN_COOKIE_SAME_SITE?.toLowerCase() === 'none'
    ? 'none'
    : 'lax';
}

function setSessionCookie(response: NextResponse, value: string) {
  const sameSite = getSameSite();
  response.cookies.set(SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || sameSite === 'none',
    sameSite,
    path: '/api/admin',
    maxAge: SESSION_DURATION_SECONDS,
  });
}

function createSessionToken(sessionSecret: string) {
  const issuedAt = Date.now().toString();
  const nonce = randomBytes(24).toString('base64url');
  const payload = `${issuedAt}.${nonce}`;
  const signature = createHmac('sha256', sessionSecret).update(payload).digest('base64url');

  return `${payload}.${signature}`;
}

function hasValidSession(request: NextRequest, sessionSecret: string) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const [issuedAt, nonce, signature, ...rest] = token.split('.');
  if (!issuedAt || !nonce || !signature || rest.length > 0) return false;

  const issuedAtMs = Number(issuedAt);
  const now = Date.now();
  if (
    !Number.isSafeInteger(issuedAtMs) ||
    issuedAtMs > now ||
    now - issuedAtMs > SESSION_DURATION_SECONDS * 1000
  ) {
    return false;
  }

  const expected = createHmac('sha256', sessionSecret)
    .update(`${issuedAt}.${nonce}`)
    .digest('base64url');

  return safeEqual(signature, expected);
}

export async function OPTIONS(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return new Response(null, { status: 403, headers: getCorsHeaders(request) });
  }

  return new Response(null, { status: 204, headers: getCorsHeaders(request) });
}

export async function GET(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return jsonResponse(request, { error: 'Origin not allowed.' }, 403);
  }

  const config = getAuthConfig();
  if (!config) {
    return jsonResponse(request, { error: 'Admin authentication is not configured.' }, 503);
  }

  if (!hasValidSession(request, config.sessionSecret)) {
    return jsonResponse(request, { authenticated: false }, 401);
  }

  return jsonResponse(request, { authenticated: true });
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return jsonResponse(request, { error: 'Origin not allowed.' }, 403);
  }

  const config = getAuthConfig();
  if (!config) {
    return jsonResponse(request, { error: 'Admin authentication is not configured.' }, 503);
  }

  let credentials: unknown;
  try {
    credentials = await request.json();
  } catch {
    return jsonResponse(request, { error: 'Invalid request.' }, 400);
  }

  if (
    typeof credentials !== 'object' ||
    credentials === null ||
    !('email' in credentials) ||
    !('password' in credentials) ||
    typeof credentials.email !== 'string' ||
    typeof credentials.password !== 'string'
  ) {
    return jsonResponse(request, { error: 'Invalid request.' }, 400);
  }

  const emailMatches = safeEqual(credentials.email.trim().toLowerCase(), config.email);
  const passwordMatches = safeEqual(credentials.password, config.password);
  if (!emailMatches || !passwordMatches) {
    return jsonResponse(request, { error: 'Invalid email or password.' }, 401);
  }

  const response = jsonResponse(request, { authenticated: true });
  setSessionCookie(response, createSessionToken(config.sessionSecret));
  return response;
}

export async function DELETE(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return jsonResponse(request, { error: 'Origin not allowed.' }, 403);
  }

  const response = jsonResponse(request, { authenticated: false });
  response.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || getSameSite() === 'none',
    sameSite: getSameSite(),
    path: '/api/admin',
    maxAge: 0,
  });
  return response;
}
