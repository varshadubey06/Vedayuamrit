'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CheckCircle2,
  Send,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setIsSubmitted(false);
      }, 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
          Connect with Our Vaidyas
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ayur-forest">
          Contact VEDAYU AMRIT
        </h1>
        <p className="text-xs sm:text-sm text-ayur-stone leading-relaxed">
          Have questions regarding herbal formulations, order shipments, or personalized Ayurvedic recommendations? We are here to support your wellness journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact Details & WhatsApp */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-lg text-ayur-forest pb-3 border-b border-ayur-sand/60">
              Direct Contact Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-ayur-cream text-ayur-goldDark flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-ayur-forest">Registered Pharmacopoeia & Vaidyashala</h4>
                  <p className="text-ayur-stone mt-0.5">
                    VEDAYU AMRIT Works, Shantikunj Marg, Haridwar, Uttarakhand - 249401, India.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-ayur-cream text-ayur-goldDark flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-ayur-forest">Customer Care Helpline</h4>
                  <p className="text-ayur-stone mt-0.5">
                    <a href="tel:+919876543210" className="hover:text-ayur-forest font-semibold">
                      +91 98765 43210
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-ayur-cream text-ayur-goldDark flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-ayur-forest">Email Inquiries</h4>
                  <p className="text-ayur-stone mt-0.5">
                    <a href="mailto:support@vedayuamrit.com" className="hover:text-ayur-forest font-semibold">
                      support@vedayuamrit.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-ayur-cream text-ayur-goldDark flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-ayur-forest">Operating Hours</h4>
                  <p className="text-ayur-stone mt-0.5">
                    Monday to Saturday: 9:00 AM – 8:00 PM IST (Closed on National Holidays)
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Instant WhatsApp Doctor Consultation</span>
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                Connect directly with certified Ayurvedic doctors for dosage and Prakriti guidance.
              </p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition"
              >
                <span>Chat on WhatsApp (+91 98765 43210)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-ayur-forest pb-3 border-b border-ayur-sand/60">
            Send Us an Inquiry
          </h3>

          {isSubmitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="font-serif font-bold text-base text-emerald-950">
                Message Sent Successfully!
              </h4>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                Dhanyavaad for reaching out. One of our Ayurvedic specialists will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-ayur-charcoal mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohini Iyer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-ayur-sand bg-white focus:outline-none focus:border-ayur-forest"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ayur-charcoal mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-ayur-sand bg-white focus:outline-none focus:border-ayur-forest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-ayur-charcoal mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="rohini@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-ayur-sand bg-white focus:outline-none focus:border-ayur-forest"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ayur-charcoal mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-ayur-sand bg-white focus:outline-none focus:border-ayur-forest font-medium"
                  >
                    <option value="Product Recommendation">Product Recommendation</option>
                    <option value="Existing Order Tracking">Existing Order Tracking</option>
                    <option value="Dosha Consultation">Ayurvedic Dosha Consultation</option>
                    <option value="Bulk / Wholesale Inquiry">Bulk / Wholesale Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ayur-charcoal mb-1">Your Message or Health Concern</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what product or health topic you'd like advice on..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-ayur-sand bg-white focus:outline-none focus:border-ayur-forest"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-ayur-forest to-ayur-emerald hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

