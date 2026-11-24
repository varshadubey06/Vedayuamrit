'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  MessageCircle,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'VA-849201';
  const { getOrderById } = useCart();

  const order = getOrderById(orderNumber);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      {/* Success Hero Card */}
      <div className="text-center p-8 sm:p-12 rounded-3xl bg-white border border-ayur-sand shadow-sm space-y-4">
        <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          Order Successfully Placed
        </span>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-ayur-forest">
          Dhanyavaad for Ordering with VEDAYU AMRIT!
        </h1>

        <p className="text-xs sm:text-sm text-ayur-stone max-w-md mx-auto leading-relaxed">
          Your holistic healing journey begins now. Our vaidyas are preparing your order using classical Vedic standards.
        </p>

        {/* Order Details Badge */}
        <div className="p-4 rounded-2xl bg-ayur-cream/60 border border-ayur-sand max-w-md mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-ayur-stone block text-[11px]">Order Reference ID</span>
            <span className="font-mono font-bold text-sm text-ayur-forest">{orderNumber}</span>
          </div>
          <div className="sm:border-l sm:border-ayur-sand sm:pl-4">
            <span className="text-ayur-stone block text-[11px]">Estimated Delivery</span>
            <span className="font-bold text-xs text-emerald-700">
              {order?.estimatedDelivery || 'In 2-4 business days'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/track-order?orderId=${orderNumber}`}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-ayur-forest to-ayur-emerald hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition"
          >
            <Truck className="w-4 h-4 text-ayur-goldLight" />
            <span>Track This Shipment</span>
          </Link>

          <Link
            href="/shop"
            className="px-6 py-3 rounded-xl bg-ayur-cream hover:bg-ayur-sand border border-ayur-sand text-ayur-forest font-semibold text-xs sm:text-sm transition"
          >
            Continue Shopping
          </Link>

          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(
              `Namaste VEDAYU AMRIT, I just placed order ${orderNumber}. Please confirm my shipment details.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Support
          </a>
        </div>
      </div>

      {/* Order Summary & Delivery Address */}
      {order && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-ayur-forest pb-3 border-b border-ayur-sand/60">
            Order Breakdown
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <p className="font-bold text-ayur-charcoal uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-ayur-goldDark" /> Shipping Address
              </p>
              <div className="p-4 rounded-2xl bg-ayur-cream/40 border border-ayur-sand text-ayur-stone leading-relaxed">
                <p className="font-bold text-ayur-forest">{order.customer.fullName}</p>
                <p>{order.customer.address}</p>
                <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
                <p className="mt-1 font-mono text-[11px]">Phone: {order.customer.phone}</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-ayur-charcoal uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-ayur-goldDark" /> Payment & Summary
              </p>
              <div className="p-4 rounded-2xl bg-ayur-cream/40 border border-ayur-sand space-y-1.5 text-ayur-stone">
                <div className="flex justify-between">
                  <span>Payment Mode:</span>
                  <span className="font-bold text-ayur-forest uppercase">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className="font-bold text-emerald-700">{order.paymentStatus}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-ayur-sand/60 font-bold text-ayur-forest text-sm">
                  <span>Total Paid / Due:</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-ayur-stone">Loading Order Confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}

