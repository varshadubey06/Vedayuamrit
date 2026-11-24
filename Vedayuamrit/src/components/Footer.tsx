'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Leaf,
  HeartHandshake,
  Clock,
} from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-ayur-deep text-white border-t border-ayur-gold/30 relative overflow-hidden font-sans">
      {/* Decorative Ayurvedic Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-ayur-leaf/10 blur-3xl pointer-events-none" />

      {/* Trust Highlights Strip */}
      <div className="border-b border-white/10 py-7 bg-black/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3.5 justify-center sm:justify-start">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-ayur-gold/30 text-ayur-gold">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">100% Pure Herbs</h4>
                <p className="text-[11px] text-white/60">Wildcrafted &amp; Single-Origin</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center sm:justify-start">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-ayur-gold/30 text-ayur-gold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">GMP &amp; AYUSH</h4>
                <p className="text-[11px] text-white/60">Strict Pharmacopoeia</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center sm:justify-start">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-ayur-gold/30 text-ayur-gold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">Cash on Delivery</h4>
                <p className="text-[11px] text-white/60">Pan-India Doorstep COD</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center sm:justify-start">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-ayur-gold/30 text-ayur-gold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">Free Shipping ₹499+</h4>
                <p className="text-[11px] text-white/60">Express 24-Hr Dispatch</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info with Transparent Logo */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-52 sm:w-60 h-14 sm:h-16">
                <Image
                  src="/images/vedayu-logo.png"
                  alt="VEDAYU AMRIT"
                  fill
                  unoptimized
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-white/75 max-w-sm">
              VEDAYU AMRIT is a premium Indian Herbal and Ayurvedic brand inspired by India’s ancient Vedic traditions and pure natural botanicals. Combining 5,000-year-old traditional knowledge with modern GMP quality standards.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-bold text-ayur-goldLight uppercase tracking-wider mb-2">
                Join our Ayurvedic Circle for 10% Off
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-900/60 border border-emerald-500/50 text-emerald-200 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Dhanyavaad! Your coupon code VEDA10 has been activated.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-ayur-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-ayur-gold to-ayur-goldDark text-ayur-deep font-bold rounded-xl text-xs flex items-center gap-1 hover:brightness-110 transition shadow-sm"
                  >
                    Subscribe <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs font-bold text-ayur-goldLight uppercase tracking-wider mb-4 pb-1 border-b border-white/10">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/category/ayurvedic-products" className="hover:text-ayur-gold transition">
                  Ayurvedic Health Products
                </Link>
              </li>
              <li>
                <Link href="/category/herbal-juices" className="hover:text-ayur-gold transition">
                  Herbal Juices &amp; Immunity
                </Link>
              </li>
              <li>
                <Link href="/category/skin-care" className="hover:text-ayur-gold transition">
                  Skin Care &amp; Ubtans
                </Link>
              </li>
              <li>
                <Link href="/category/hair-care" className="hover:text-ayur-gold transition">
                  Hair Care &amp; Shampoos
                </Link>
              </li>
              <li>
                <Link href="/category/herbal-oils" className="hover:text-ayur-gold transition">
                  Authentic Herbal Oils
                </Link>
              </li>
              <li>
                <Link href="/category/herbal-powders-churnas" className="hover:text-ayur-gold transition">
                  Powders &amp; Churnas
                </Link>
              </li>
              <li>
                <Link href="/category/personal-care" className="hover:text-ayur-gold transition">
                  Personal &amp; Body Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links & Policies */}
          <div>
            <h4 className="text-xs font-bold text-ayur-goldLight uppercase tracking-wider mb-4 pb-1 border-b border-white/10">
              Explore &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/shop" className="hover:text-ayur-gold transition font-semibold text-white">
                  ✨ Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ayur-gold transition">
                  Our Brand Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-ayur-gold transition">
                  Ayurvedic Knowledge &amp; Blog
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-ayur-gold transition">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-ayur-gold transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-ayur-gold transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-ayur-gold transition">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-ayur-gold transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-ayur-gold transition">
                  Return &amp; Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Wellness Centers */}
          <div>
            <h4 className="text-xs font-bold text-ayur-goldLight uppercase tracking-wider mb-4 pb-1 border-b border-white/10">
              Contact &amp; Vaidyashala
            </h4>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-ayur-gold flex-shrink-0 mt-0.5" />
                <span>
                  VEDAYU AMRIT Works, Shantikunj Marg, Haridwar, Uttarakhand - 249401, India.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-ayur-gold flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-ayur-gold flex-shrink-0" />
                <a href="mailto:support@vedayuamrit.com" className="hover:text-white transition">
                  support@vedayuamrit.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  WhatsApp: +91 98765 43210
                </a>
              </div>
              <div className="pt-2 text-[11px] text-white/50">
                Customer Support: Mon - Sat (9:00 AM to 8:00 PM IST)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment Logos & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 text-center sm:text-left">
            <p>© {new Date().getFullYear()} VEDAYU AMRIT Private Limited. All Rights Reserved.</p>
            <p>
              Designed &amp; Developed by{' '}
              <a
                href="https://viksitvyapar.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-ayur-goldLight hover:text-white transition-colors"
              >
                Viksit Vyapar
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-ayur-goldLight font-medium">100% Secure Checkout:</span>
            {/* UPI Real Icon */}
            <div className="h-6 px-2 rounded bg-white flex items-center justify-center shadow-xs" title="UPI">
              <svg className="h-3.5 w-auto" viewBox="0 0 120 40" fill="none">
                <path d="M12 28L20 8H26L18 28H12Z" fill="#0F813D" />
                <path d="M22 28L30 8H36L28 28H22Z" fill="#F47920" />
                <text x="42" y="26" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" fontStyle="italic" fill="#0B2545">UPI</text>
              </svg>
            </div>
            {/* GPay Real Icon */}
            <div className="h-6 px-2 rounded bg-white flex items-center justify-center shadow-xs" title="Google Pay">
              <svg className="h-3.5 w-auto" viewBox="0 0 140 40" fill="none">
                <path d="M20 20.2C20 19.3 19.9 18.5 19.8 17.7H10V22.4H15.6C15.4 23.9 14.5 25.1 13.2 26V28.9H16.9C19.1 26.8 20 23.8 20 20.2Z" fill="#4285F4" />
                <path d="M10 30.5C12.8 30.5 15.2 29.5 16.9 27.9L13.2 25C12.2 25.7 11.2 26.1 10 26.1C7.3 26.1 5 24.3 4.2 21.8H0.4V24.8C2.2 28.3 5.8 30.5 10 30.5Z" fill="#34A853" />
                <path d="M4.2 21.8C4 21.1 3.9 20.4 3.9 19.6C3.9 18.8 4 18.1 4.2 17.4V14.4H0.4C-0.3 16 -0.3 18.4 -0.3 19.6C-0.3 20.8 -0.3 23.2 0.4 24.8L4.2 21.8Z" fill="#FBBC05" />
                <path d="M10 13.1C11.5 13.1 12.9 13.6 13.9 14.6L17.1 11.4C15.2 9.6 12.8 8.7 10 8.7C5.8 8.7 2.2 10.9 0.4 14.4L4.2 17.4C5 14.9 7.3 13.1 10 13.1Z" fill="#EA4335" />
                <text x="26" y="27" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="21" fill="#3c4043">Pay</text>
              </svg>
            </div>
            {/* RuPay Real Icon */}
            <div className="h-6 px-2 rounded bg-white flex items-center justify-center shadow-xs" title="RuPay">
              <svg className="h-3.5 w-auto" viewBox="0 0 110 34" fill="none">
                <text x="2" y="25" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" fontStyle="italic" fill="#003366">RuPay</text>
                <path d="M85 8L95 17L85 26L89 26L99 17L89 8H85Z" fill="#F37021" />
                <path d="M94 8L104 17L94 26L98 26L108 17L98 8H94Z" fill="#00A3E0" />
              </svg>
            </div>
            {/* Visa Real Icon */}
            <div className="h-6 px-2 rounded bg-white flex items-center justify-center shadow-xs" title="Visa">
              <svg className="h-3 w-auto" viewBox="0 0 90 32" fill="none">
                <text x="2" y="25" fontFamily="'Impact', Arial, sans-serif" fontWeight="900" fontSize="26" fontStyle="italic" fill="#1A1F71">VISA</text>
                <path d="M2 7L7 22H11L6 7H2Z" fill="#F7B600" />
              </svg>
            </div>
            {/* Mastercard Real Icon */}
            <div className="h-6 px-1.5 rounded bg-white flex items-center justify-center shadow-xs" title="Mastercard">
              <svg className="h-4 w-auto" viewBox="0 0 70 42" fill="none">
                <circle cx="24" cy="21" r="16" fill="#EB001B" />
                <circle cx="46" cy="21" r="16" fill="#F79E1B" fillOpacity="0.9" />
                <path d="M35 8.7C38.7 12 41 16.3 41 21C41 25.7 38.7 30 35 33.3C31.3 30 29 25.7 29 21C29 16.3 31.3 12 35 8.7Z" fill="#FF5F00" />
              </svg>
            </div>
            {/* COD Badge */}
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold text-[10px] border border-emerald-500/30">
              COD Available
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
