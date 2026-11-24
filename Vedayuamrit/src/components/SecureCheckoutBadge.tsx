'use client';

import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface SecureCheckoutBadgeProps {
  variant?: 'compact' | 'full' | 'inline';
  className?: string;
}

export default function SecureCheckoutBadge({
  variant = 'full',
  className = '',
}: SecureCheckoutBadgeProps) {
  return (
    <div
      className={`rounded-2xl border border-amber-200/80 bg-gradient-to-b from-white to-amber-50/30 p-4 shadow-sm font-sans ${className}`}
    >
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-2 text-ayur-deep font-bold text-xs sm:text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Secure Checkout</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
          <Lock className="w-3 h-3 text-amber-600" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      {/* Real Payment Provider Logos */}
      <div className="pt-3 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
        {/* 1. UPI */}
        <div
          className="h-9 px-3 rounded-lg bg-white border border-stone-200/90 shadow-xs flex items-center justify-center hover:border-amber-400 transition"
          title="Unified Payments Interface (UPI)"
        >
          <svg className="h-5 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 28L20 8H26L18 28H12Z" fill="#0F813D" />
            <path d="M22 28L30 8H36L28 28H22Z" fill="#F47920" />
            <text x="42" y="26" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="22" fontStyle="italic" fill="#0B2545">
              UPI
            </text>
          </svg>
        </div>

        {/* 2. Google Pay (GPay) */}
        <div
          className="h-9 px-3 rounded-lg bg-white border border-stone-200/90 shadow-xs flex items-center justify-center hover:border-amber-400 transition"
          title="Google Pay"
        >
          <svg className="h-5 w-auto" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Google 4-color G */}
            <path
              d="M20 20.2C20 19.3 19.9 18.5 19.8 17.7H10V22.4H15.6C15.4 23.9 14.5 25.1 13.2 26V28.9H16.9C19.1 26.8 20 23.8 20 20.2Z"
              fill="#4285F4"
            />
            <path
              d="M10 30.5C12.8 30.5 15.2 29.5 16.9 27.9L13.2 25C12.2 25.7 11.2 26.1 10 26.1C7.3 26.1 5 24.3 4.2 21.8H0.4V24.8C2.2 28.3 5.8 30.5 10 30.5Z"
              fill="#34A853"
            />
            <path
              d="M4.2 21.8C4 21.1 3.9 20.4 3.9 19.6C3.9 18.8 4 18.1 4.2 17.4V14.4H0.4C-0.3 16 -0.3 18.4 -0.3 19.6C-0.3 20.8 -0.3 23.2 0.4 24.8L4.2 21.8Z"
              fill="#FBBC05"
            />
            <path
              d="M10 13.1C11.5 13.1 12.9 13.6 13.9 14.6L17.1 11.4C15.2 9.6 12.8 8.7 10 8.7C5.8 8.7 2.2 10.9 0.4 14.4L4.2 17.4C5 14.9 7.3 13.1 10 13.1Z"
              fill="#EA4335"
            />
            {/* Pay Wordmark */}
            <text x="26" y="27" fontFamily="'Poppins', Roboto, sans-serif" fontWeight="700" fontSize="21" fill="#3c4043">
              Pay
            </text>
          </svg>
        </div>

        {/* 3. RuPay */}
        <div
          className="h-9 px-3 rounded-lg bg-white border border-stone-200/90 shadow-xs flex items-center justify-center hover:border-amber-400 transition"
          title="RuPay Card"
        >
          <svg className="h-5 w-auto" viewBox="0 0 110 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="2" y="25" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="22" fontStyle="italic" fill="#003366">
              RuPay
            </text>
            {/* RuPay Dual Chevrons */}
            <path d="M85 8L95 17L85 26L89 26L99 17L89 8H85Z" fill="#F37021" />
            <path d="M94 8L104 17L94 26L98 26L108 17L98 8H94Z" fill="#00A3E0" />
          </svg>
        </div>

        {/* 4. VISA */}
        <div
          className="h-9 px-3 rounded-lg bg-white border border-stone-200/90 shadow-xs flex items-center justify-center hover:border-amber-400 transition"
          title="Visa"
        >
          <svg className="h-5 w-auto" viewBox="0 0 90 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="2" y="25" fontFamily="'Impact', Arial, sans-serif" fontWeight="900" fontSize="26" fontStyle="italic" fill="#1A1F71" letterSpacing="1">
              VISA
            </text>
            <path d="M2 7L7 22H11L6 7H2Z" fill="#F7B600" />
          </svg>
        </div>

        {/* 5. Mastercard */}
        <div
          className="h-9 px-3 rounded-lg bg-white border border-stone-200/90 shadow-xs flex items-center justify-center hover:border-amber-400 transition"
          title="Mastercard"
        >
          <svg className="h-6 w-auto" viewBox="0 0 70 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="21" r="16" fill="#EB001B" />
            <circle cx="46" cy="21" r="16" fill="#F79E1B" fillOpacity="0.9" />
            <path
              d="M35 8.7C38.7 12 41 16.3 41 21C41 25.7 38.7 30 35 33.3C31.3 30 29 25.7 29 21C29 16.3 31.3 12 35 8.7Z"
              fill="#FF5F00"
            />
          </svg>
        </div>

        {/* 6. Cash on Delivery (COD) */}
        <div
          className="h-9 px-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 shadow-xs flex items-center gap-1.5 hover:bg-emerald-100 transition font-bold text-xs"
          title="Cash on Delivery Available"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>COD Available</span>
        </div>
      </div>
    </div>
  );
}

