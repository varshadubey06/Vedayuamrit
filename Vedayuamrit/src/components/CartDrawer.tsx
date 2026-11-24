'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import SecureCheckoutBadge from '@/components/SecureCheckoutBadge';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Tag, ArrowRight, Truck } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-ayur-sand/60 flex items-center justify-between bg-ayur-cream/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-ayur-forest text-ayur-goldLight">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-ayur-forest text-lg">Your Ayurvedic Cart</h2>
                <p className="text-xs text-ayur-stone">
                  {cart.length === 0 ? 'Empty bag' : `${cart.reduce((s, i) => s + i.quantity, 0)} holistic items`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-ayur-sand/60 text-ayur-stone hover:text-ayur-forest transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-ayur-forest/5 px-5 py-3 border-b border-ayur-sand/40">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-medium text-ayur-forest">
                <Truck className="w-4 h-4 text-ayur-goldDark" />
                {remainingForFreeShipping > 0
                  ? `Add ₹${remainingForFreeShipping} more for FREE Express Shipping!`
                  : '🎉 You have unlocked FREE Express Shipping!'}
              </span>
              <span className="font-bold text-ayur-forest">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-ayur-sand/80 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-ayur-gold to-emerald-600 transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-ayur-cream border border-ayur-sand flex items-center justify-center text-ayur-stone">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-ayur-forest text-lg">Your Cart is Empty</h3>
                  <p className="text-xs text-ayur-stone mt-1 max-w-xs mx-auto">
                    Explore our range of authentic Ayurvedic powders, oils, juices and wellness formulations.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ayur-forest text-white text-xs font-semibold hover:bg-ayur-deep transition"
                >
                  <Sparkles className="w-4 h-4 text-ayur-goldLight" /> Explore Ayurvedic Range
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-ayur-sand/60 bg-white hover:border-ayur-gold/40 transition shadow-sm"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-ayur-cream flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif text-sm font-semibold text-ayur-forest hover:text-emerald-700 line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-rose-600 transition p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-ayur-stone">{item.product.sizeWeight} • {item.product.dosageForm}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 border border-ayur-sand rounded-lg px-2 py-0.5 bg-ayur-cream/30">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="text-ayur-stone hover:text-ayur-forest p-0.5 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-1 text-ayur-forest min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-ayur-stone hover:text-ayur-forest p-0.5 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-sm text-ayur-forest">
                          ₹{item.product.price * item.quantity}
                        </span>
                        {item.product.mrp > item.product.price && (
                          <span className="block text-[10px] text-ayur-stone line-through">
                            ₹{item.product.mrp * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-ayur-sand/70 bg-ayur-cream/30 space-y-3.5">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="font-bold text-emerald-800">{appliedCoupon.code}</span>
                      <p className="text-[10px] text-emerald-600">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. VEDA10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-ayur-sand focus:outline-none focus:border-ayur-leaf bg-white uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-ayur-forest hover:bg-ayur-deep text-white rounded-xl text-xs font-semibold transition"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
                  )}
                  <div className="flex gap-1.5 mt-1.5">
                    <span className="text-[10px] text-ayur-stone">Try:</span>
                    <button
                      type="button"
                      onClick={() => applyCoupon('VEDA10')}
                      className="text-[10px] font-mono font-bold text-ayur-goldDark hover:underline"
                    >
                      VEDA10 (10% OFF)
                    </button>
                    <span className="text-[10px] text-ayur-stone">•</span>
                    <button
                      type="button"
                      onClick={() => applyCoupon('AYUSH20')}
                      className="text-[10px] font-mono font-bold text-ayur-goldDark hover:underline"
                    >
                      AYUSH20 (20% OFF)
                    </button>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-ayur-stone pt-2 border-t border-ayur-sand/50">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ayur-forest">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Ayurvedic Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className={shipping === 0 ? 'text-emerald-700 font-semibold' : 'text-ayur-forest'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-ayur-forest pt-2 border-t border-ayur-sand/60">
                  <span>Grand Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-ayur-forest via-ayur-emerald to-ayur-forest hover:brightness-110 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-ayur-forest/20 transition-all transform active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-ayur-goldLight" />
              </Link>

              {/* 100% Secure Checkout Badge */}
              <SecureCheckoutBadge className="mt-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

