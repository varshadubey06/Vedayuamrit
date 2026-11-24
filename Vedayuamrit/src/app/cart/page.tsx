'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import SecureCheckoutBadge from '@/components/SecureCheckoutBadge';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  Tag,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');

  const freeShippingThreshold = 499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-ayur-cream border border-ayur-sand flex items-center justify-center text-ayur-stone">
          <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
        </div>
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ayur-forest">
            Your Ayurvedic Basket is Empty
          </h1>
          <p className="text-xs sm:text-sm text-ayur-stone mt-2 max-w-md mx-auto">
            Discover handcrafted herbal oils, organic churnas, cold-pressed juices, and revitalizing supplements.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-ayur-forest to-ayur-emerald text-white text-xs sm:text-sm font-semibold hover:shadow-gold transition"
        >
          <Sparkles className="w-4 h-4 text-ayur-goldLight" />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ayur-forest">
          Your Shopping Cart
        </h1>
        <p className="text-xs text-ayur-stone">
          Review your herbal items and proceed to secure checkout.
        </p>
      </div>

      {/* Free Shipping Meter */}
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="flex items-center gap-1.5 font-bold text-emerald-900">
            <Truck className="w-4 h-4 text-emerald-700" />
            {remainingForFreeShipping > 0
              ? `Add ₹${remainingForFreeShipping} more to unlock FREE Express Shipping!`
              : '🎉 You qualify for FREE Pan-India Shipping!'}
          </span>
          <span className="font-bold text-emerald-800">{freeShippingProgress}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-emerald-200 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-ayur-gold to-emerald-600 transition-all duration-500 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-ayur-sand/80 shadow-sm overflow-hidden divide-y divide-ayur-sand/60">
            {cart.map((item) => (
              <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-ayur-cream flex-shrink-0 border border-ayur-sand/60">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-ayur-goldDark uppercase tracking-wider">
                      {item.product.category}
                    </span>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-serif font-bold text-sm sm:text-base text-ayur-forest hover:text-emerald-700 block"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-ayur-stone">
                      {item.product.sizeWeight} • {item.product.dosageForm}
                    </p>
                    <span className="text-xs font-bold text-ayur-forest sm:hidden mt-1 block">
                      ₹{item.product.price} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-ayur-sand/40">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-ayur-sand rounded-xl bg-ayur-cream/30 px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 text-ayur-stone hover:text-ayur-forest"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold px-3 text-ayur-forest min-w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 text-ayur-stone hover:text-ayur-forest"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="font-bold text-base text-ayur-forest">
                      ₹{item.product.price * item.quantity}
                    </span>
                    {item.product.mrp > item.product.price && (
                      <span className="block text-[11px] text-ayur-stone line-through">
                        ₹{item.product.mrp * item.quantity}
                      </span>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-ayur-stone pt-2">
            <Link href="/shop" className="text-ayur-leaf font-semibold hover:underline">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm space-y-5">
            <h3 className="font-serif font-bold text-base text-ayur-forest pb-3 border-b border-ayur-sand/60">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-800">{appliedCoupon.code}</span>
                    <p className="text-[11px] text-emerald-600">{appliedCoupon.description}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-ayur-sand font-mono uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-ayur-forest text-white text-xs font-semibold rounded-xl"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
                </div>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-ayur-stone pt-2 border-t border-ayur-sand/60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-ayur-forest">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Ayurvedic Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-emerald-700 font-semibold' : 'text-ayur-forest'}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-ayur-forest pt-3 border-t border-ayur-sand/60">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Checkout Link */}
            <Link
              href="/checkout"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-ayur-forest via-ayur-emerald to-ayur-forest hover:brightness-110 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-ayur-forest/20 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-ayur-goldLight" />
            </Link>

            <SecureCheckoutBadge className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

