'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  category: 'Products' | 'Orders & Payment' | 'Shipping' | 'Consultations';
}

const FAQS: FAQItem[] = [
  {
    category: 'Products',
    q: 'Are VEDAYU AMRIT products 100% pure and Ayurvedic certified?',
    a: 'Yes, absolutely. Every formulation is manufactured in GMP-certified facilities licensed by the Ministry of AYUSH. We use single-origin wildcrafted herbs and slow-simmered extracts strictly without artificial colors, petroleum derivatives, parabens, or synthetic fragrance oils.',
  },
  {
    category: 'Products',
    q: 'How are your herbal oils prepared differently from commercial brands?',
    a: 'Most commercial oils use light liquid paraffin (LLP) or petroleum as a cheap base. At VEDAYU AMRIT, we strictly honor the ancient "Kshirpak" and "Taila Paka" methods codified in Charaka Samhita. Herbs like Bhringraj, Amla, and Brahmi are simmered in pure milk and cold-pressed black sesame oil over wood fires in copper cauldrons for up to 48 hours.',
  },
  {
    category: 'Products',
    q: 'Do your herbal powders contain added preservatives or anti-caking chemicals?',
    a: 'Zero. Our powders (Ashwagandha, Shatavari, Triphala, Moringa, etc.) are 100% single-herb whole roots, fruits, or leaves cold-stone pulverized at low temperatures to ensure bio-active withanolides, vitamins, and saponins remain fully intact.',
  },
  {
    category: 'Orders & Payment',
    q: 'Is Cash on Delivery (COD) available across India?',
    a: 'Yes! We offer Cash on Delivery across 19,000+ Indian PIN codes. You can pay via cash or UPI directly to the courier agent upon doorstep arrival.',
  },
  {
    category: 'Orders & Payment',
    q: 'What online payment gateways do you support?',
    a: 'We accept all major payment modes including Instant UPI (Google Pay, PhonePe, Paytm, BHIM), RuPay, Visa, MasterCard, and NetBanking through bank-grade 256-bit encrypted gateways.',
  },
  {
    category: 'Orders & Payment',
    q: 'How do I apply coupon discount codes?',
    a: 'You can apply promo codes such as VEDA10 (10% OFF above ₹499) or AYUSH20 (20% OFF above ₹999) directly in your Cart Drawer or during Checkout in the promo box.',
  },
  {
    category: 'Shipping',
    q: 'What is the shipping fee and delivery timeframe?',
    a: 'Orders above ₹499 qualify for 100% FREE Pan-India Express Shipping. Orders below ₹499 have a nominal shipping fee of ₹49. Dispatch is executed within 24 hours from our Haridwar hub, and delivery takes 2 to 4 business days to metro cities.',
  },
  {
    category: 'Shipping',
    q: 'How can I track my shipment?',
    a: 'You can track your order status in real time by visiting our "Track Order" page and entering your Order ID (e.g. VA-849201) or registered mobile phone number. You also receive live tracking notifications on SMS and WhatsApp.',
  },
  {
    category: 'Consultations',
    q: 'Are the Ayurvedic Vaidya consultations on WhatsApp really free?',
    a: 'Yes. Our mission is to promote authentic Ayurvedic wellness. You can connect with our in-house certified Ayurvedic Vaidyas on WhatsApp (+91 98765 43210) for personalized product dosage and dosha recommendations without any consultation fee.',
  },
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = FAQS.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
          Help & Answers
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ayur-forest">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-ayur-stone">
          Learn more about our classical formulations, purity guarantees, shipping, and payments.
        </p>

        {/* Search Input */}
        <div className="relative max-w-md mx-auto pt-2">
          <input
            type="text"
            placeholder="Search questions (e.g. COD, shipping, copper)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-ayur-sand bg-white focus:outline-none focus:border-ayur-forest"
          />
          <Search className="w-4 h-4 text-ayur-stone absolute left-3 top-5" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {['all', 'Products', 'Orders & Payment', 'Shipping', 'Consultations'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
              activeCategory === cat
                ? 'bg-ayur-forest text-white'
                : 'bg-white border border-ayur-sand text-ayur-stone hover:bg-ayur-cream'
            }`}
          >
            {cat === 'all' ? 'All Questions' : cat}
          </button>
        ))}
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-ayur-sand/80 bg-white overflow-hidden shadow-sm transition"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-ayur-forest hover:bg-ayur-cream/30 transition"
            >
              <span>{faq.q}</span>
              {openIndex === idx ? (
                <ChevronUp className="w-4 h-4 text-ayur-goldDark flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-ayur-stone flex-shrink-0" />
              )}
            </button>

            {openIndex === idx && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-ayur-charcoal leading-relaxed border-t border-ayur-sand/50 bg-ayur-cream/10">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* WhatsApp Support Box */}
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
        <h4 className="font-serif font-bold text-base text-emerald-950">
          Still Have Questions or Need Custom Advice?
        </h4>
        <p className="text-xs text-emerald-800 max-w-md mx-auto">
          Our customer support and Ayurvedic team are available Mon-Sat, 9 AM to 8 PM IST.
        </p>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition"
        >
          <MessageCircle className="w-4 h-4" /> Chat on WhatsApp (+91 98765 43210)
        </a>
      </div>
    </div>
  );
}

