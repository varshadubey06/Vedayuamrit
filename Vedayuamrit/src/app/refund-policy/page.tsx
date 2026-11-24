import React from 'react';
import { RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-xs sm:text-sm text-ayur-charcoal leading-relaxed">
      <div className="space-y-2 pb-6 border-b border-ayur-sand/80">
        <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
          Customer Protection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ayur-forest">
          Return &amp; Refund Policy
        </h1>
        <p className="text-xs text-ayur-stone">
          7-Day Easy Return &amp; Replacement Assurance
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">1. 7-Day Return Window</h2>
          <p>
            Your satisfaction and trust in authentic Ayurvedic wellness are our highest priorities. If you receive a product that is damaged in transit, defective, leaked, or incorrect, you can request a replacement or full refund within <strong>7 days of delivery</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">2. Return Eligibility Criteria</h2>
          <ul className="list-disc pl-5 space-y-1 text-ayur-stone">
            <li>The item must be in its original packaging with safety seals, batches, and tags intact.</li>
            <li>For opened items where product defect is suspected, please share a clear photo or video to our WhatsApp support (+91 98765 43210).</li>
            <li>Single-use consumable products that have been substantially used or consumed are not eligible for hygiene and Ayurvedic safety compliance.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">3. How to Initiate a Return</h2>
          <p>
            Initiating a return is simple:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-ayur-stone">
            <li>WhatsApp our support team at <strong>+91 98765 43210</strong> or email <strong>support@vedayuamrit.com</strong> with your Order ID (e.g. VA-849201).</li>
            <li>Attach a quick photo showing the outer packaging and batch number.</li>
            <li>Our team will arrange a free reverse pickup from your doorstep via our courier partner.</li>
          </ol>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">4. Refund Timelines</h2>
          <p>
            Once the returned parcel is received at our Haridwar warehouse and verified:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-ayur-stone">
            <li><strong>Prepaid Orders (UPI/Cards):</strong> Refund is credited back to your original source account within <strong>3 to 5 business days</strong>.</li>
            <li><strong>Cash on Delivery (COD) Orders:</strong> We will request your UPI ID or bank account details; refund will be wired via IMPS within <strong>24 to 48 hours</strong>.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

