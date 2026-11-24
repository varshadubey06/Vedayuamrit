'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import SecureCheckoutBadge from '@/components/SecureCheckoutBadge';
import { PRODUCTS } from '@/data/products';
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  User,
  Phone,
  Mail,
} from 'lucide-react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const buyNowId = searchParams.get('buyNow');
  const buyNowQty = Number(searchParams.get('qty') || 1);

  const { cart, subtotal, discount, shipping, total, placeOrder, addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  // If Buy Now parameter is passed and cart is empty or we want to ensure product is in cart
  useEffect(() => {
    if (buyNowId) {
      const foundProduct = PRODUCTS.find((p) => p.id === buyNowId);
      if (foundProduct && !cart.some((item) => item.product.id === buyNowId)) {
        addToCart(foundProduct, buyNowQty);
      }
    }
  }, [buyNowId, buyNowQty, cart, addToCart]);

  // Form State
  const defaultAddr = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];

  const [fullName, setFullName] = useState(defaultAddr?.fullName || user?.fullName || 'Aarav Sharma');
  const [email, setEmail] = useState(user?.email || 'aarav.sharma@example.com');
  const [phone, setPhone] = useState(defaultAddr?.phone || user?.phone || '+91 98765 43210');
  const [address, setAddress] = useState(defaultAddr?.addressLine || 'Flat 402, Lotus Residency, 12th Main, Indiranagar');
  const [city, setCity] = useState(defaultAddr?.city || 'Bengaluru');
  const [state, setState] = useState(defaultAddr?.state || 'Karnataka');
  const [pincode, setPincode] = useState(defaultAddr?.pincode || '560038');

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'razorpay' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty! Please add items before placing order.');
      router.push('/shop');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const createdOrder = placeOrder({
        items: cart,
        subtotal,
        discount,
        shipping,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'COD Confirmed' : 'Paid',
        status: 'Order Placed',
        customer: {
          fullName,
          email,
          phone,
          address,
          city,
          state,
          pincode,
        },
      });

      setIsProcessing(false);
      router.push(`/order-success?orderNumber=${createdOrder.orderNumber}`);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Checkout Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-ayur-sand/80 gap-2">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ayur-forest">
            Secure Ayurvedic Checkout
          </h1>
          <p className="text-xs text-ayur-stone">
            All orders are sealed at our Haridwar pharmacopoeia facility with tamper-proof security.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
          <Lock className="w-3.5 h-3.5 text-emerald-700" />
          <span>256-Bit SSL Encrypted Payment</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Customer & Delivery Details & Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Contact Information */}
            <div className="p-6 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-ayur-forest flex items-center gap-2">
                <User className="w-4 h-4 text-ayur-goldDark" />
                1. Customer Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-ayur-charcoal mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-ayur-sand bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ayur-charcoal mb-1">Mobile Phone (for tracking updates)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-ayur-sand bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-ayur-charcoal mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-ayur-sand bg-white"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="p-6 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-ayur-forest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ayur-goldDark" />
                2. Shipping & Delivery Address
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-ayur-charcoal mb-1">Flat / House No. / Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Flat 402, Lotus Residency, 12th Main Road"
                    className="w-full px-3 py-2.5 rounded-xl border border-ayur-sand bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-ayur-charcoal mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-ayur-sand bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-ayur-charcoal mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-ayur-sand bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-ayur-charcoal mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-ayur-sand bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="p-6 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-ayur-forest flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-ayur-goldDark" />
                3. Choose Payment Method
              </h3>

              <div className="space-y-3">
                {/* UPI */}
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'upi'
                      ? 'border-ayur-forest bg-ayur-cream/40'
                      : 'border-ayur-sand/70 bg-white hover:bg-ayur-cream/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-ayur-forest w-4 h-4"
                    />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-ayur-forest">
                        Instant UPI Payment (Google Pay, PhonePe, Paytm, BHIM)
                      </p>
                      <p className="text-[11px] text-ayur-stone">
                        Instant confirmation • Zero transaction charges
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Fastest
                  </span>
                </label>

                {/* Online Gateway Cards / NetBanking */}
                <label
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'razorpay'
                      ? 'border-ayur-forest bg-ayur-cream/40'
                      : 'border-ayur-sand/70 bg-white hover:bg-ayur-cream/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="accent-ayur-forest w-4 h-4"
                    />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-ayur-forest">
                        Credit / Debit Card / NetBanking (Razorpay Secured)
                      </p>
                      <p className="text-[11px] text-ayur-stone">
                        All Indian Banks, Visa, MasterCard, RuPay
                      </p>
                    </div>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'cod'
                      ? 'border-ayur-forest bg-ayur-cream/40'
                      : 'border-ayur-sand/70 bg-white hover:bg-ayur-cream/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-ayur-forest w-4 h-4"
                    />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-ayur-forest">
                        Cash on Delivery (COD)
                      </p>
                      <p className="text-[11px] text-ayur-stone">
                        Pay with cash or UPI to courier upon doorstep arrival
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    COD Available
                  </span>
                </label>
              </div>

              {/* 100% Secure Checkout Badge with Real Icons */}
              <SecureCheckoutBadge className="mt-5" />
            </div>
          </div>

          {/* Right Column: Order Items Review & Final CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm space-y-5 sticky top-28">
              <h3 className="font-serif font-bold text-base text-ayur-forest pb-3 border-b border-ayur-sand/60">
                Order Items ({cart.length})
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-ayur-cream flex-shrink-0 border border-ayur-sand">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-ayur-forest truncate">{item.product.name}</p>
                        <p className="text-[11px] text-ayur-stone">Qty: {item.quantity} × ₹{item.product.price}</p>
                      </div>
                    </div>
                    <span className="font-bold text-ayur-forest whitespace-nowrap">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2 text-xs text-ayur-stone pt-4 border-t border-ayur-sand/60">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-ayur-forest">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Ayurvedic Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald-700 font-semibold' : 'text-ayur-forest'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-ayur-forest pt-3 border-t border-ayur-sand/60">
                  <span>Grand Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-ayur-forest via-ayur-emerald to-ayur-forest hover:brightness-110 text-white font-bold text-sm tracking-wide shadow-lg shadow-ayur-forest/30 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying with Pharmacopoeia...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-ayur-goldLight" />
                    <span>Place Order (₹{total})</span>
                    <ArrowRight className="w-4 h-4 text-ayur-goldLight" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-center text-ayur-stone pt-2 space-y-1">
                <p>🌿 Certified AYUSH & GMP manufacturing facilities in Haridwar.</p>
                <p>Doorstep delivery within 2-4 business days.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-ayur-stone">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

