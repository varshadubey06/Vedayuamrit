'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { X, Sparkles, User, Lock, Mail, Phone, CheckCircle } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode, login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      login(identifier || 'aarav.sharma@example.com');
      setSuccessMsg('Welcome back to VEDAYU AMRIT!');
      setTimeout(() => closeAuthModal(), 1200);
    } else {
      register(name || 'Ayurvedic Devotee', email || 'devotee@vedayu.in', phone || '+91 98765 00000');
      setSuccessMsg('Account created successfully! Welcome to the VEDAYU family.');
      setTimeout(() => closeAuthModal(), 1200);
    }
  };

  const handleQuickDemoLogin = () => {
    login('aarav.sharma@example.com');
    setSuccessMsg('Signed in as Aarav Sharma!');
    setTimeout(() => closeAuthModal(), 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={closeAuthModal}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl border border-ayur-sand overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Top Banner with Official Transparent Brand Logo */}
          <div className="bg-gradient-to-r from-ayur-deep via-ayur-forest to-ayur-deep p-6 text-white text-center relative border-b border-ayur-gold/30">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-48 h-14 mx-auto mb-1">
              <Image
                src="/images/vedayu-logo.png"
                alt="VEDAYU AMRIT"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <p className="text-[11px] text-ayur-goldLight italic">Rooted in Ayurveda, Inspired by Nature.</p>
          </div>

          {/* Mode Tabs */}
          <div className="flex border-b border-ayur-sand/60 bg-ayur-cream/30">
            <button
              onClick={() => { setMode('login'); setSuccessMsg(''); }}
              className={`flex-1 py-3 text-xs font-semibold transition ${mode === 'login'
                ? 'text-ayur-forest border-b-2 border-ayur-forest bg-white'
                : 'text-ayur-stone hover:text-ayur-forest'
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setSuccessMsg(''); }}
              className={`flex-1 py-3 text-xs font-semibold transition ${mode === 'register'
                ? 'text-ayur-forest border-b-2 border-ayur-forest bg-white'
                : 'text-ayur-stone hover:text-ayur-forest'
                }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-6">
            {successMsg ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <p className="font-semibold text-ayur-forest text-sm">{successMsg}</p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'login' ? (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-ayur-charcoal mb-1">
                          Email Address or Mobile Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. aarav@example.com or 9876543210"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-ayur-sand focus:outline-none focus:border-ayur-leaf bg-white"
                          />
                          <Mail className="w-4 h-4 text-ayur-stone absolute left-3 top-3" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-xs font-semibold text-ayur-charcoal">
                            Password / OTP
                          </label>
                          <a href="#" className="text-[11px] text-ayur-leaf hover:underline">
                            Forgot?
                          </a>
                        </div>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder="Enter password or OTP"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-ayur-sand focus:outline-none focus:border-ayur-leaf bg-white"
                          />
                          <Lock className="w-4 h-4 text-ayur-stone absolute left-3 top-3" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-ayur-charcoal mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-ayur-sand focus:outline-none focus:border-ayur-leaf bg-white"
                          />
                          <User className="w-4 h-4 text-ayur-stone absolute left-3 top-3" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-ayur-charcoal mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="name@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-ayur-sand focus:outline-none focus:border-ayur-leaf bg-white"
                          />
                          <Mail className="w-4 h-4 text-ayur-stone absolute left-3 top-3" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-ayur-charcoal mb-1">
                          Mobile Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-ayur-sand focus:outline-none focus:border-ayur-leaf bg-white"
                          />
                          <Phone className="w-4 h-4 text-ayur-stone absolute left-3 top-3" />
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-ayur-forest hover:bg-ayur-deep text-white font-semibold text-xs tracking-wide shadow-md transition"
                  >
                    {mode === 'login' ? 'Sign In to Account' : 'Register & Join VEDAYU Family'}
                  </button>
                </form>

                {/* Quick 1-Click Demo Login */}
                <div className="mt-4 pt-4 border-t border-ayur-sand/60 text-center">
                  <p className="text-[11px] text-ayur-stone mb-2">Fast Developer & Demo Access:</p>
                  <button
                    onClick={handleQuickDemoLogin}
                    className="w-full py-2 px-3 rounded-xl border border-ayur-gold/60 bg-amber-50/50 hover:bg-amber-100/60 text-ayur-forest font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-ayur-goldDark" />
                    1-Click Sign In as Aarav Sharma (Demo)
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

