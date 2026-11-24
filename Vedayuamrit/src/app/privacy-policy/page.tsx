import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-xs sm:text-sm text-ayur-charcoal leading-relaxed">
      <div className="space-y-2 pb-6 border-b border-ayur-sand/80">
        <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
          Legal & Trust
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ayur-forest">
          Privacy Policy
        </h1>
        <p className="text-xs text-ayur-stone">
          Last Updated: November 2026 • VEDAYU AMRIT Private Limited
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">1. Introduction</h2>
          <p>
            At <strong>VEDAYU AMRIT</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), we hold your privacy with the utmost reverence. This Privacy Policy outlines how we collect, process, safeguard, and use your personal information when you visit our website, place orders for herbal products, or interact with our Ayurvedic consultation desks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">2. Information We Collect</h2>
          <p>
            When you purchase our Ayurvedic remedies or register an account, we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-ayur-stone">
            <li>Contact Information: Full Name, Email Address, Contact Phone Number.</li>
            <li>Shipping Details: Delivery address, City, State, and Indian PIN Code.</li>
            <li>Transactional Details: Payment method choices (UPI, Card, NetBanking, COD), order histories, and invoice data. (Note: We never store your full debit/credit card numbers or UPI MPINs).</li>
            <li>Consultation Data: Dosha assessments and health queries voluntarily shared during doctor chats.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">3. How We Use Your Data</h2>
          <p>
            Your information is exclusively utilized for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-ayur-stone">
            <li>Order fulfillment, tamper-proof packaging, and express courier dispatch.</li>
            <li>Sending SMS and WhatsApp delivery tracking milestones.</li>
            <li>Providing customer support and personalized herbal dosage guidance.</li>
            <li>Preventing fraudulent transactions and ensuring compliance with AYUSH e-commerce norms.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">4. Data Security</h2>
          <p>
            All network communication with VEDAYU AMRIT is secured via 256-bit SSL/TLS encryption. We strictly do not sell, rent, or trade your personal health or shopping details with external advertisers or third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">5. Grievance Redressal</h2>
          <p>
            For any queries or concerns regarding your private data, please reach out to our designated Grievance Officer at <strong>support@vedayuamrit.com</strong> or call <strong>+91 98765 43210</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

