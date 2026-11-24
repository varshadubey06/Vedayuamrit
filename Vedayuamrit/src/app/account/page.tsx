'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  Sparkles,
  Truck,
  Plus,
  Trash2,
  CheckCircle2,
  LayoutDashboard,
} from 'lucide-react';

export default function MyAccountPage() {
  const { user, isAuthenticated, logout, openLoginModal, addAddress, deleteAddress } = useAuth();
  const { orders, wishlist } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'wishlist'>('orders');

  // New address form state
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [newLabel, setNewLabel] = useState('Home');
  const [newName, setNewName] = useState(user?.fullName || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [newLine, setNewLine] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPin, setNewPin] = useState('');

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-ayur-cream border border-ayur-sand flex items-center justify-center mx-auto text-ayur-stone">
          <User className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ayur-forest">
          Sign In to Your Account
        </h1>
        <p className="text-xs sm:text-sm text-ayur-stone max-w-sm mx-auto">
          Access your order history, manage saved delivery addresses, and track shipments.
        </p>
        <button
          onClick={openLoginModal}
          className="px-8 py-3 rounded-xl bg-ayur-forest hover:bg-ayur-deep text-white font-semibold text-xs sm:text-sm shadow-md transition"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLine.trim() && newCity.trim() && newPin.trim()) {
      addAddress({
        label: newLabel,
        fullName: newName || user.fullName,
        phone: newPhone || user.phone,
        addressLine: newLine,
        city: newCity,
        state: newState || 'Karnataka',
        pincode: newPin,
        isDefault: false,
      });
      setShowAddAddr(false);
      setNewLine('');
      setNewCity('');
      setNewPin('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Account Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-ayur-deep via-ayur-forest to-ayur-deep text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-ayur-gold flex items-center justify-center text-xl font-serif font-bold text-ayur-goldLight">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl font-bold">{user.fullName}</h1>
              {user.doshaQuizResult && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-200 border border-amber-400/40">
                  {user.doshaQuizResult} Prakriti
                </span>
              )}
            </div>
            <p className="text-xs text-white/70">{user.email} • {user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-xs font-semibold text-white flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ayur-sand/80 gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'orders'
              ? 'text-ayur-forest border-b-2 border-ayur-forest bg-white rounded-t-xl'
              : 'text-ayur-stone hover:text-ayur-forest'
            }`}
        >
          <Package className="w-4 h-4 text-ayur-goldDark" /> Order History ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-5 py-3 text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'wishlist'
              ? 'text-ayur-forest border-b-2 border-ayur-forest bg-white rounded-t-xl'
              : 'text-ayur-stone hover:text-ayur-forest'
            }`}
        >
          <Heart className="w-4 h-4 text-rose-500" /> Saved Wishlist ({wishlist.length})
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-5 py-3 text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'addresses'
              ? 'text-ayur-forest border-b-2 border-ayur-forest bg-white rounded-t-xl'
              : 'text-ayur-stone hover:text-ayur-forest'
            }`}
        >
          <MapPin className="w-4 h-4 text-ayur-goldDark" /> Saved Addresses ({user.addresses.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-5 py-3 text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'profile'
              ? 'text-ayur-forest border-b-2 border-ayur-forest bg-white rounded-t-xl'
              : 'text-ayur-stone hover:text-ayur-forest'
            }`}
        >
          <User className="w-4 h-4 text-ayur-goldDark" /> Profile & Prakriti
        </button>
      </div>

      {/* TAB 1: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-ayur-sand space-y-3">
              <Package className="w-12 h-12 text-ayur-stone mx-auto" />
              <h3 className="font-serif font-bold text-base text-ayur-forest">No orders placed yet</h3>
              <p className="text-xs text-ayur-stone">Explore our authentic remedies to begin healing.</p>
              <Link href="/shop" className="inline-block px-5 py-2 bg-ayur-forest text-white text-xs rounded-xl font-semibold">
                Explore Store
              </Link>
            </div>
          ) : (
            orders.map((ord) => (
              <div key={ord.id} className="p-6 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-ayur-sand/60 gap-2">
                  <div>
                    <span className="font-mono font-bold text-sm text-ayur-forest mr-2">
                      Order #{ord.orderNumber}
                    </span>
                    <span className="text-xs text-ayur-stone">• Placed on {ord.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {ord.status}
                    </span>
                    <Link
                      href={`/track-order?orderId=${ord.orderNumber}`}
                      className="px-3 py-1 bg-ayur-cream hover:bg-ayur-sand border border-ayur-sand text-ayur-forest font-semibold text-xs rounded-lg flex items-center gap-1 transition"
                    >
                      <Truck className="w-3.5 h-3.5" /> Track Shipment
                    </Link>
                  </div>
                </div>

                <div className="divide-y divide-ayur-sand/40">
                  {ord.items.map((it) => (
                    <div key={it.product.id} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-ayur-cream flex-shrink-0">
                          <Image src={it.product.image} alt={it.product.name} fill className="object-cover" />
                        </div>
                        <div>
                          <Link href={`/product/${it.product.slug}`} className="font-semibold text-ayur-forest hover:underline">
                            {it.product.name}
                          </Link>
                          <p className="text-[11px] text-ayur-stone">Qty: {it.quantity} • {it.product.sizeWeight}</p>
                        </div>
                      </div>
                      <span className="font-bold text-ayur-forest">
                        ₹{it.product.price * it.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-ayur-sand/60 flex justify-between items-center text-xs">
                  <span className="text-ayur-stone">
                    Paid via {ord.paymentMethod.toUpperCase()} ({ord.paymentStatus})
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-ayur-stone mr-2">Total Amount:</span>
                    <span className="font-bold text-base text-ayur-forest">₹{ord.total}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlist.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-ayur-sand space-y-3">
              <Heart className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-serif font-bold text-base text-ayur-forest">Your wishlist is empty</h3>
              <p className="text-xs text-ayur-stone">Tap the heart on any product to save it for later.</p>
              <Link href="/shop" className="inline-block px-5 py-2 bg-ayur-forest text-white text-xs rounded-xl font-semibold">
                Discover Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-base text-ayur-forest">Saved Delivery Addresses</h3>
            <button
              onClick={() => setShowAddAddr(!showAddAddr)}
              className="px-4 py-2 bg-ayur-forest hover:bg-ayur-deep text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add New Address
            </button>
          </div>

          {/* Add Address Form */}
          {showAddAddr && (
            <form onSubmit={handleSaveAddress} className="p-6 rounded-3xl bg-white border border-ayur-sand shadow-sm space-y-4 text-xs">
              <h4 className="font-bold text-sm text-ayur-forest">New Address</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-ayur-charcoal mb-1">Label (Home / Work)</label>
                  <input
                    type="text"
                    required
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    className="w-full p-2 border border-ayur-sand rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-ayur-charcoal mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 border border-ayur-sand rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-ayur-charcoal mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full p-2 border border-ayur-sand rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-ayur-charcoal mb-1">Address Line</label>
                <input
                  type="text"
                  required
                  placeholder="Street / Building / Landmark"
                  value={newLine}
                  onChange={(e) => setNewLine(e.target.value)}
                  className="w-full p-2 border border-ayur-sand rounded-xl"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-ayur-charcoal mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full p-2 border border-ayur-sand rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-ayur-charcoal mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full p-2 border border-ayur-sand rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-ayur-charcoal mb-1">PIN Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    className="w-full p-2 border border-ayur-sand rounded-xl"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-emerald-700 text-white font-semibold rounded-xl text-xs">
                  Save Address
                </button>
                <button type="button" onClick={() => setShowAddAddr(false)} className="px-4 py-2 bg-stone-100 text-stone-600 rounded-xl text-xs">
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.addresses.map((addr) => (
              <div key={addr.id} className="p-5 rounded-2xl bg-white border border-ayur-sand/80 shadow-sm space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ayur-forest bg-ayur-cream px-2.5 py-0.5 rounded-lg border border-ayur-sand">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Default
                    </span>
                  )}
                  <button onClick={() => deleteAddress(addr.id)} className="text-stone-400 hover:text-rose-600 p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-bold text-ayur-charcoal">{addr.fullName}</p>
                <p className="text-ayur-stone">{addr.addressLine}</p>
                <p className="text-ayur-stone">{addr.city}, {addr.state} - {addr.pincode}</p>
                <p className="text-[11px] font-mono text-ayur-stone pt-1">Phone: {addr.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PROFILE */}
      {activeTab === 'profile' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm max-w-2xl space-y-5 text-xs">
          <h3 className="font-serif font-bold text-base text-ayur-forest pb-3 border-b border-ayur-sand/60">
            Profile Information
          </h3>

          <div className="space-y-3">
            <div>
              <span className="font-bold text-ayur-charcoal block mb-1">Full Name:</span>
              <p className="p-3 bg-ayur-cream/40 rounded-xl border border-ayur-sand text-ayur-forest font-semibold">{user.fullName}</p>
            </div>
            <div>
              <span className="font-bold text-ayur-charcoal block mb-1">Registered Email:</span>
              <p className="p-3 bg-ayur-cream/40 rounded-xl border border-ayur-sand text-ayur-forest font-semibold">{user.email}</p>
            </div>
            <div>
              <span className="font-bold text-ayur-charcoal block mb-1">Registered Mobile:</span>
              <p className="p-3 bg-ayur-cream/40 rounded-xl border border-ayur-sand text-ayur-forest font-semibold">{user.phone}</p>
            </div>
            <div>
              <span className="font-bold text-ayur-charcoal block mb-1">Ayurvedic Prakriti (Constitutional Type):</span>
              <p className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 font-bold">
                {user.doshaQuizResult || 'Pitta-Vata'} — Cooling, grounding Rasayanas recommended.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

