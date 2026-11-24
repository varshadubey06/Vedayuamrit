'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  MessageCircle,
  Truck,
  Sparkles,
  ChevronDown,
  Package,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const { itemCount, total, setIsCartOpen, wishlist } = useCart();
  const { user, isAuthenticated, openLoginModal, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const catMenuRef = useRef<HTMLDivElement>(null);

  // Pure category list - No emojis, no tags, clean & direct
  const categories = [
    { name: 'Ayurvedic Health Products', slug: 'ayurvedic-products' },
    { name: 'Herbal Juices & Immunity', slug: 'herbal-juices' },
    { name: 'Ayurvedic Skin Care', slug: 'skin-care' },
    { name: 'Hair Care & Herbal Oils', slug: 'hair-care' },
    { name: 'Herbal Powders & Churnas', slug: 'herbal-powders-churnas' },
    { name: 'Herbal Teas & Infusions', slug: 'herbal-tea' },
    { name: 'Herbal Nutrition & Superfoods', slug: 'herbal-nutrition' },
  ];

  // Live search handler
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const results = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.ingredients.some((i) => i.name.toLowerCase().includes(q))
      ).slice(0, 6);
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  // Click outside to close menus
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (catMenuRef.current && !catMenuRef.current.contains(e.target as Node)) {
        setIsCatDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs border-b border-amber-200/50 font-sans">
      {/* 1. Slim Top Announcement Bar */}
      <div className="bg-gradient-to-r from-ayur-deep via-[#0d2a1b] to-ayur-deep text-white px-3 sm:px-6 py-1 text-[11px] border-b border-amber-400/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-ayur-goldLight text-[10px] sm:text-[11px] truncate">
            <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0 animate-pulse" />
            <span className="font-semibold text-white truncate">Pure Herbal &amp; Classical Ayurvedic Formulations</span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline text-white/90">Free Express Shipping Above ₹499</span>
          </div>

          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-white/90 flex-shrink-0">
            <Link href="/track-order" className="hover:text-amber-300 transition flex items-center gap-1">
              <Truck className="w-3 h-3 text-amber-400" />
              <span>Track Order</span>
            </Link>
            <span className="text-white/30">|</span>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-300 hover:text-emerald-200 transition flex items-center gap-1 font-semibold"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="hidden xs:inline">WhatsApp Vaidya</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Header Bar - Perfectly Clamped Width, No Horizontal Overflow */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 h-12 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Mobile Menu Trigger + Brand Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1.5 -ml-1 rounded-xl text-ayur-forest hover:bg-amber-50 transition lg:hidden flex-shrink-0"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Official Brand Logo - Prominent & Proportional */}
          <Link href="/" className="relative flex items-center group py-0.5" aria-label="VEDAYU AMRIT Home">
            <div className="relative w-36 sm:w-44 md:w-52 lg:w-56 xl:w-60 h-10 sm:h-12 lg:h-13 filter drop-shadow-[0_2px_8px_rgba(217,119,6,0.22)] group-hover:drop-shadow-[0_4px_14px_rgba(217,119,6,0.35)] transition-all duration-300">
              <Image
                src="/images/vedayu-logo.png"
                alt="VEDAYU AMRIT - Rooted in Ayurveda, Inspired by Nature"
                fill
                priority
                unoptimized
                className="object-contain object-left"
              />
            </div>
          </Link>
        </div>

        {/* Center: Desktop Single-Line Navigation Options */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-xs font-bold tracking-wider uppercase text-stone-800 whitespace-nowrap">
          <Link href="/" className="relative py-2 group hover:text-amber-800 transition-colors whitespace-nowrap">
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 group-hover:w-full transition-all duration-300" />
          </Link>

          <Link href="/shop" className="relative py-2 group hover:text-amber-800 transition-colors whitespace-nowrap">
            <span>Shop</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Categories Dropdown - Solid White BG, No Emojis, Clean Options */}
          <div
            ref={catMenuRef}
            className="relative"
            onMouseEnter={() => setIsCatDropdownOpen(true)}
            onMouseLeave={() => setIsCatDropdownOpen(false)}
          >
            <button
              onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
              className="flex items-center gap-1 py-2 group hover:text-amber-800 transition-colors uppercase whitespace-nowrap"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-amber-600 transition-transform duration-200 ${isCatDropdownOpen ? 'rotate-180' : ''
                  }`}
              />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 group-hover:w-full transition-all duration-300" />
            </button>

            {/* Simple Solid Dropdown */}
            {isCatDropdownOpen && (
              <div className="absolute top-full left-0 mt-0.5 w-60 rounded-xl bg-white shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 normal-case">
                <div className="px-4 py-1.5 border-b border-stone-100 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                  Ayurvedic Categories
                </div>
                <div className="py-1">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      onClick={() => setIsCatDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 hover:text-emerald-900 transition-colors whitespace-nowrap"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-stone-100 mt-1 pt-1.5 px-4 pb-1">
                  <Link
                    href="/shop"
                    onClick={() => setIsCatDropdownOpen(false)}
                    className="text-xs font-bold text-amber-800 hover:text-emerald-800 flex items-center justify-between transition-colors"
                  >
                    <span>All Products</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/about" className="relative py-2 group hover:text-amber-800 transition-colors whitespace-nowrap">
            <span>About</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 group-hover:w-full transition-all duration-300" />
          </Link>

          <Link href="/blog" className="relative py-2 group hover:text-amber-800 transition-colors whitespace-nowrap">
            <span>Wisdom</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 group-hover:w-full transition-all duration-300" />
          </Link>

          <Link href="/contact" className="relative py-2 group hover:text-amber-800 transition-colors whitespace-nowrap">
            <span>Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 group-hover:w-full transition-all duration-300" />
          </Link>
        </nav>

        {/* Right: Search + Wishlist + User + Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="p-2 rounded-full text-stone-700 hover:bg-amber-50 transition md:hidden"
            aria-label="Open search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Desktop Search Input with Autocomplete */}
          <div ref={searchRef} className="relative hidden md:block w-32 lg:w-40 xl:w-48">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setIsSearchOpen(true)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-full border border-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-400/30 bg-stone-50 text-stone-800 placeholder-stone-400 transition"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2" />
            </form>

            {/* Live Autocomplete Results */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 w-72 rounded-2xl bg-white shadow-2xl border border-stone-200 overflow-hidden z-50">
                <div className="p-2 border-b border-stone-100 text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                  Matching Formulations ({searchResults.length})
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-stone-100">
                  {searchResults.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-2.5 hover:bg-amber-50/50 transition text-left"
                    >
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                        <Image src={p.image} alt={p.name} fill unoptimized className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-stone-900 truncate">{p.name}</p>
                        <p className="text-[10px] text-stone-500 truncate">₹{p.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <Link
            href="/account"
            className="p-2 rounded-full hover:bg-amber-50 text-stone-700 hover:text-amber-800 transition relative"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* User Account / Profile */}
          <div ref={userMenuRef} className="relative">
            {isAuthenticated ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1 p-1 rounded-full hover:bg-amber-50 text-stone-800 transition"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-ayur-forest to-ayur-deep text-amber-300 text-xs font-bold flex items-center justify-center border border-amber-400/40 shadow-xs">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className="flex items-center gap-1 p-2 sm:px-3 sm:py-1.5 rounded-full hover:bg-amber-50 text-stone-800 text-xs font-semibold transition"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-stone-700" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Clean User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-stone-100">
                  <p className="text-xs font-bold text-stone-900 truncate">{user?.fullName}</p>
                  <p className="text-[10px] text-stone-500 truncate">{user?.email}</p>
                </div>
                <Link
                  href="/account"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-stone-700 hover:bg-amber-50 transition font-medium"
                >
                  <User className="w-3.5 h-3.5 text-amber-700" /> My Profile &amp; Orders
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-stone-700 hover:bg-amber-50 transition font-medium"
                >
                  <Package className="w-3.5 h-3.5 text-amber-700" /> Track Shipment
                </Link>
                <div className="border-t border-stone-100 mt-1 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Trigger - Perfectly visible on all screens */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-ayur-forest via-[#14432c] to-ayur-deep text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full shadow-md hover:shadow-gold transition transform active:scale-95 border border-amber-400/40 flex-shrink-0"
            aria-label="View Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-ayur-forest">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline-block font-semibold text-xs tracking-wide">
              {total > 0 ? `₹${total}` : 'Cart'}
            </span>
          </button>
        </div>
      </div>

      {/* 2B. Mobile Expandable Search Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-3 py-2 bg-stone-50 border-t border-stone-200 animate-in slide-in-from-top-1 duration-150">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search herbal &amp; ayurvedic products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-9 pr-8 py-2 text-xs rounded-full border border-stone-200 focus:outline-none focus:border-amber-500 bg-white text-stone-800"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>
      )}

      {/* 3. Mobile Slide-out Drawer - Clean, Responsive & Luxury */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Drawer Header with Brand Logo */}
              <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                <div className="relative w-40 h-11 filter drop-shadow-[0_2px_8px_rgba(217,119,6,0.22)]">
                  <Image
                    src="/images/vedayu-logo.png"
                    alt="VEDAYU AMRIT"
                    fill
                    unoptimized
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-full border border-stone-200 bg-stone-50 text-stone-800"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </form>

              {/* Mobile Links */}
              <nav className="space-y-1 text-xs font-semibold text-stone-800">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl hover:bg-amber-50 transition"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-amber-50/80 text-amber-900 font-bold"
                >
                  <span>Shop All Products</span>
                  <span className="text-[10px] text-amber-700">Pure Formulations →</span>
                </Link>

                <div className="pt-2 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Ayurvedic Categories
                </div>
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl hover:bg-amber-50 text-stone-700 transition"
                  >
                    {c.name}
                  </Link>
                ))}

                <div className="pt-2 border-t border-amber-100">
                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-xl hover:bg-amber-50 transition"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-xl hover:bg-amber-50 transition"
                  >
                    Ayurvedic Wisdom
                  </Link>
                  <Link
                    href="/track-order"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-xl hover:bg-amber-50 transition"
                  >
                    Track Order
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-xl hover:bg-amber-50 transition"
                  >
                    Contact Us
                  </Link>
                </div>
              </nav>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-4 border-t border-amber-100 space-y-2">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Consultation
              </a>
              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ministry of AYUSH Approved</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 
