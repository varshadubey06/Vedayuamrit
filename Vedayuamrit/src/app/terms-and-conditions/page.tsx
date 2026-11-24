import React from 'react';
import Link from 'next/link';

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-xs sm:text-sm text-ayur-charcoal leading-relaxed">
      <div className="space-y-2 pb-6 border-b border-ayur-sand/80">
        <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
          Legal Terms
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ayur-forest">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-ayur-stone">
          Effective Date: November 2026 • VEDAYU AMRIT Private Limited
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">1. Agreement to Terms</h2>
          <p>
            By accessing or purchasing from <strong>VEDAYU AMRIT</strong>, you agree to be bound by these Terms and Conditions and all applicable Indian statutory laws, including the Consumer Protection Act, 2019 and the Drugs and Cosmetics Act, 1940.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">2. Ayurvedic Disclaimer &amp; Nature of Products</h2>
          <p>
            The herbal products, dietary churnas, oils, and informational articles hosted on this platform are rooted in traditional classical Ayurvedic knowledge and are licensed under the Ministry of AYUSH. They are designed to support systemic balance and general wellness. They are not intended as substitutes for emergency medical intervention.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">3. Pricing &amp; Order Acceptance</h2>
          <p>
            All listed prices are displayed in Indian Rupees (₹ INR) inclusive of all applicable statutory GST. We reserve the right to modify pricing, promotional coupons, or rectify typographical pricing errors before dispatch.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">4. Intellectual Property</h2>
          <p>
            The brand name &ldquo;VEDAYU AMRIT&rdquo;, the tagline &ldquo;Rooted in Ayurveda, Inspired by Nature&rdquo;, the logo, product packaging designs, and text descriptions are exclusive trademarks and intellectual property of VEDAYU AMRIT Private Limited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">5. Governing Law &amp; Jurisdiction</h2>
          <p>
            Any disputes arising out of your purchases shall be subject to the exclusive jurisdiction of the competent courts in Haridwar / Dehradun, Uttarakhand, India.
          </p>
        </section>
      </div>
    </div>
  );
}

