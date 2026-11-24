'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Order } from '@/types';
import {
  Truck,
  Search,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  Calendar,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const { orders, getOrderById } = useCart();
  const [query, setQuery] = useState(initialOrderId || 'VA-849201');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      const found = getOrderById(query);
      if (found) {
        setCurrentOrder(found);
        setSearched(true);
      } else if (orders.length > 0) {
        setCurrentOrder(orders[0]);
        setSearched(true);
      }
    }
  }, [query, getOrderById, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const found = getOrderById(query);
      setCurrentOrder(found || null);
      setSearched(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-300">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-ayur-forest">
          Track Your Ayurvedic Order
        </h1>
        <p className="text-xs sm:text-sm text-ayur-stone">
          Enter your VEDAYU AMRIT Order ID (e.g. <strong>VA-849201</strong>) or registered phone number.
        </p>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto pt-2">
          <div className="relative flex-1">
            <input
              type="text"
              required
              placeholder="Order ID (e.g. VA-849201) or Phone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-3 text-xs sm:text-sm rounded-xl border border-ayur-sand focus:outline-none focus:border-ayur-forest bg-white font-mono uppercase"
            />
            <Search className="w-4 h-4 text-ayur-stone absolute left-3 top-3.5" />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-ayur-forest hover:bg-ayur-deep text-white rounded-xl text-xs sm:text-sm font-semibold transition"
          >
            Track Now
          </button>
        </form>
      </div>

      {/* Tracking Results Card */}
      {searched && (
        <>
          {currentOrder ? (
            <div className="bg-white rounded-3xl border border-ayur-sand/80 shadow-sm p-6 sm:p-10 space-y-8">
              {/* Order Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-ayur-sand/60 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm sm:text-base font-bold text-ayur-forest">
                      Order #{currentOrder.orderNumber}
                    </span>
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {currentOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-ayur-stone">
                    Placed on {currentOrder.date} • Courier: {currentOrder.trackingId || 'Delhivery Express'}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-ayur-stone block">Estimated Delivery</span>
                  <span className="font-bold text-sm text-emerald-700">
                    {currentOrder.estimatedDelivery || 'In 2-3 business days'}
                  </span>
                </div>
              </div>

              {/* Visual Shipment Timeline */}
              <div>
                <h3 className="font-serif font-bold text-sm text-ayur-forest mb-6">
                  Shipment Progress Timeline
                </h3>

                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-ayur-sand">
                  {currentOrder.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Milestone Dot */}
                      <div
                        className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                          step.completed
                            ? 'bg-emerald-600 border-white text-white shadow-sm'
                            : 'bg-white border-ayur-sand text-stone-300'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-stone-300" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4
                            className={`font-serif text-xs sm:text-sm font-bold ${
                              step.completed ? 'text-ayur-forest' : 'text-ayur-stone'
                            }`}
                          >
                            {step.status}
                          </h4>
                          <span className="text-[11px] text-ayur-stone font-mono">
                            {step.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-ayur-stone mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Package & Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-ayur-sand/60 text-xs">
                {/* Shipping Address */}
                <div className="p-4 rounded-2xl bg-ayur-cream/40 border border-ayur-sand/60 space-y-1.5">
                  <h4 className="font-bold text-ayur-forest flex items-center gap-1.5 mb-2">
                    <MapPin className="w-4 h-4 text-ayur-goldDark" /> Delivery Address
                  </h4>
                  <p className="font-bold text-ayur-charcoal">{currentOrder.customer.fullName}</p>
                  <p className="text-ayur-stone">{currentOrder.customer.address}</p>
                  <p className="text-ayur-stone">
                    {currentOrder.customer.city}, {currentOrder.customer.state} - {currentOrder.customer.pincode}
                  </p>
                  <p className="text-ayur-stone font-mono pt-1">Phone: {currentOrder.customer.phone}</p>
                </div>

                {/* Items in this parcel */}
                <div className="p-4 rounded-2xl bg-ayur-cream/40 border border-ayur-sand/60 space-y-2">
                  <h4 className="font-bold text-ayur-forest flex items-center gap-1.5 mb-2">
                    <Package className="w-4 h-4 text-ayur-goldDark" /> Items in Parcel ({currentOrder.items.length})
                  </h4>
                  <div className="space-y-2 max-h-36 overflow-y-auto">
                    {currentOrder.items.map((it) => (
                      <div key={it.product.id} className="flex justify-between items-center text-xs">
                        <span className="truncate max-w-[200px] text-ayur-forest">
                          {it.product.name} (x{it.quantity})
                        </span>
                        <span className="font-bold text-ayur-forest">
                          ₹{it.product.price * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-ayur-sand/60 flex justify-between font-bold text-ayur-forest">
                    <span>Total Amount</span>
                    <span>₹{currentOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Support CTA */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-900">
                  <MessageCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Need urgent dispatch help or delivery reschedule?</span>
                </div>
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Namaste, I want an update regarding my order ${currentOrder.orderNumber}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold whitespace-nowrap transition"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          ) : (
            <div className="p-10 text-center bg-white rounded-3xl border border-ayur-sand space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
              <h3 className="font-serif font-bold text-base text-ayur-forest">
                No order found matching &quot;{query}&quot;
              </h3>
              <p className="text-xs text-ayur-stone max-w-sm mx-auto">
                Please double check the order number on your invoice SMS/email, or track using sample demo order <strong>VA-849201</strong>.
              </p>
              <button
                onClick={() => setQuery('VA-849201')}
                className="px-4 py-2 bg-ayur-forest text-white text-xs font-semibold rounded-xl"
              >
                Track Demo Order (VA-849201)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-ayur-stone">Loading Order Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}

