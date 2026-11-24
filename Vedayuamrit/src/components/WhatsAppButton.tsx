'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const defaultPhone = '919876543210';

  const handleSend = (text: string) => {
    const message = encodeURIComponent(text || 'Namaste VEDAYU AMRIT! I would like to consult about herbal Ayurvedic products.');
    window.open(`https://wa.me/${defaultPhone}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-ayur-sand overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-gradient-to-r from-ayur-forest to-ayur-deep p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
                  VA
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-ayur-forest"></span>
              </div>
              <div>
                <h4 className="font-serif font-semibold text-sm">VEDAYU AMRIT Helpdesk</h4>
                <p className="text-xs text-ayur-goldLight flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Online • Ayurvedic Vaidya Support
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-ayur-cream/50 space-y-3">
            <div className="bg-white p-3 rounded-xl border border-ayur-sand/60 text-xs text-ayur-charcoal shadow-sm">
              <p className="font-medium text-ayur-forest mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-ayur-gold" /> Namaste & Welcome!
              </p>
              How may our Ayurvedic specialists assist your health journey today?
            </div>

            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold text-ayur-stone uppercase tracking-wider">Quick Inquiries</p>
              <button
                onClick={() => handleSend('Namaste, I need help selecting the right Ayurvedic product for my dosha.')}
                className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-ayur-sand/40 border border-ayur-sand/50 text-xs text-ayur-forest font-medium transition flex items-center justify-between group"
              >
                <span>🌿 Need Product Recommendation</span>
                <span className="text-ayur-gold group-hover:translate-x-0.5 transition">→</span>
              </button>
              <button
                onClick={() => handleSend('Hi VEDAYU AMRIT, I want to track my recent order.')}
                className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-ayur-sand/40 border border-ayur-sand/50 text-xs text-ayur-forest font-medium transition flex items-center justify-between group"
              >
                <span>📦 Track Existing Order</span>
                <span className="text-ayur-gold group-hover:translate-x-0.5 transition">→</span>
              </button>
              <button
                onClick={() => handleSend('Namaste, I would like to place an order directly on WhatsApp.')}
                className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-ayur-sand/40 border border-ayur-sand/50 text-xs text-ayur-forest font-medium transition flex items-center justify-between group"
              >
                <span>💬 Quick Order via WhatsApp</span>
                <span className="text-ayur-gold group-hover:translate-x-0.5 transition">→</span>
              </button>
            </div>

            <div className="pt-1 flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(customMsg)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-ayur-sand focus:outline-none focus:border-ayur-emerald bg-white"
              />
              <button
                onClick={() => handleSend(customMsg)}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-medium flex items-center justify-center shadow-sm transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-4 py-3.5 rounded-full shadow-lg hover:shadow-emerald-900/30 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
        aria-label="WhatsApp Ayurvedic Support"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white/20 stroke-[2.2]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-emerald-700 animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-emerald-700"></span>
        </div>
        <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">WhatsApp Support</span>
      </button>
    </div>
  );
}

