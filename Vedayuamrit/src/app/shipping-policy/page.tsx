import React from 'react';
import { Truck, ShieldCheck, Clock } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-xs sm:text-sm text-ayur-charcoal leading-relaxed">
      <div className="space-y-2 pb-6 border-b border-ayur-sand/80">
        <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
          Delivery Guidelines
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ayur-forest">
          Shipping &amp; Delivery Policy
        </h1>
        <p className="text-xs text-ayur-stone">
          Pan-India Coverage across 19,000+ PIN Codes
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">1. Free Shipping Threshold</h2>
          <p>
            We take pride in making authentic Ayurveda accessible to every Indian home. All orders with an item subtotal of <strong>₹499 or higher</strong> qualify for <strong>100% FREE Express Shipping</strong>. Orders below ₹499 carry a nominal flat shipping fee of ₹49.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">2. Dispatch &amp; Delivery Timelines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-ayur-sand space-y-1">
              <h4 className="font-bold text-ayur-forest flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-ayur-goldDark" /> Order Processing &amp; Dispatch
              </h4>
              <p className="text-ayur-stone">
                All confirmed orders are freshly packaged and handed over to courier hubs within <strong>24 business hours</strong> from Haridwar.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-ayur-sand space-y-1">
              <h4 className="font-bold text-ayur-forest flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-ayur-goldDark" /> Doorstep Delivery
              </h4>
              <p className="text-ayur-stone">
                Metro Cities: 2 to 3 Business Days.<br />
                Rest of India: 3 to 5 Business Days.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">3. Cash on Delivery (COD)</h2>
          <p>
            Cash on Delivery is enabled for nearly all serviced locations. Please ensure someone is available at the provided delivery address with the exact cash amount or UPI ready for the delivery partner.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">4. Real-time Tracking</h2>
          <p>
            Once your package is picked up by Delhivery, BlueDart, or Express couriers, an SMS and WhatsApp alert containing your active Tracking AWB is immediately dispatched to your phone. You can also monitor real-time tracking on our &quot;Track Order&quot; page.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-ayur-forest">5. Damaged or Tampered Parcels</h2>
          <p>
            Every VEDAYU AMRIT parcel is sealed with our official tamper-proof Ayurvedic seal. If you receive a box that appears visibly cut or opened, please reject the parcel and contact our team immediately on WhatsApp at <strong>+91 98765 43210</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

