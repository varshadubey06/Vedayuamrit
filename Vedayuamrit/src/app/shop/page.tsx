'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import ProductCard from '@/components/ProductCard';
import {
  Filter,
  SlidersHorizontal,
  X,
  Search,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDosha, setSelectedDosha] = useState<string>('all');
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTag = product.tagline.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesHerb = product.ingredients.some((i) => i.name.toLowerCase().includes(q));
        if (!matchesName && !matchesTag && !matchesCat && !matchesHerb) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        if (
          product.categorySlug !== selectedCategory &&
          product.subCategory?.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-') !== selectedCategory
        ) {
          return false;
        }
      }

      // Dosha
      if (selectedDosha !== 'all') {
        const matchesDosha = product.dosha.some(
          (d) => d.toLowerCase().includes(selectedDosha.toLowerCase()) || d.includes('Tridoshic')
        );
        if (!matchesDosha) return false;
      }

      // Dosage form
      if (selectedForm !== 'all') {
        if (!product.dosageForm.toLowerCase().includes(selectedForm.toLowerCase())) {
          return false;
        }
      }

      // Price
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [search, selectedCategory, selectedDosha, selectedForm, maxPrice, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedDosha('all');
    setSelectedForm('all');
    setMaxPrice(1500);
    setSortBy('featured');
  };

  const hasActiveFilters =
    search !== '' ||
    selectedCategory !== 'all' ||
    selectedDosha !== 'all' ||
    selectedForm !== 'all' ||
    maxPrice < 1500;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="relative w-full h-64 sm:h-96 bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-banner.jpg)' }}>
  <div className="relative z-10 max-w-2xl space-y-4 p-6 sm:p-10">
    <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">Shop All Ayurvedic Products</h1>
    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">Browse through traditional single-herb powders, churnas, cold-pressed oils, clarifying juices, and daily rejuvenators formulated under classical Ayurvedic guidelines.</p>
    <div className="flex gap-4 mt-4">
      <a href="/shop" className="px-5 py-2 rounded bg-amber-600 text-white font-semibold hover:bg-amber-700 transition">Explore</a>
      <a href="/shop" className="px-5 py-2 rounded bg-white text-amber-800 font-semibold hover:bg-amber-50 transition">Shop Now</a>
    </div>
  </div>
</div>

      {/* Main Grid with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-ayur-sand/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-ayur-sand/60">
              <h3 className="font-serif font-bold text-sm text-ayur-forest flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-ayur-goldDark" />
                Refine Selection
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-[11px] font-semibold text-rose-600 hover:underline"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-ayur-charcoal uppercase tracking-wider mb-2.5">
                Categories
              </label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${selectedCategory === 'all'
                      ? 'bg-ayur-forest text-white font-semibold'
                      : 'text-ayur-stone hover:bg-ayur-cream'
                    }`}
                >
                  <span>All Formulations</span>
                  <span className="text-[10px] opacity-70">★</span>
                </button>
                {CATEGORIES.slice(0, 8).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${selectedCategory === cat.slug
                        ? 'bg-ayur-forest text-white font-semibold'
                        : 'text-ayur-stone hover:bg-ayur-cream'
                      }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] opacity-70">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dosha Filter */}
            <div className="pt-4 border-t border-ayur-sand/60">
              <label className="block text-xs font-bold text-ayur-charcoal uppercase tracking-wider mb-2.5">
                Constitutional Dosha
              </label>
              <div className="space-y-1.5 text-xs">
                {['all', 'Vata', 'Pitta', 'Kapha'].map((dosha) => (
                  <label key={dosha} className="flex items-center gap-2 cursor-pointer text-ayur-charcoal hover:text-ayur-forest">
                    <input
                      type="radio"
                      name="dosha"
                      checked={selectedDosha === dosha}
                      onChange={() => setSelectedDosha(dosha)}
                      className="accent-ayur-forest"
                    />
                    <span>{dosha === 'all' ? 'All Doshas (Tridoshic)' : `${dosha} Pacifying`}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dosage Form Filter */}
            <div className="pt-4 border-t border-ayur-sand/60">
              <label className="block text-xs font-bold text-ayur-charcoal uppercase tracking-wider mb-2.5">
                Dosage Form
              </label>
              <div className="space-y-1.5 text-xs">
                {['all', 'Powder', 'Juice', 'Capsule', 'Oil', 'Cream', 'Seeds'].map((form) => (
                  <label key={form} className="flex items-center gap-2 cursor-pointer text-ayur-charcoal hover:text-ayur-forest">
                    <input
                      type="radio"
                      name="dosageForm"
                      checked={selectedForm === form}
                      onChange={() => setSelectedForm(form)}
                      className="accent-ayur-forest"
                    />
                    <span>{form === 'all' ? 'All Formats' : form}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="pt-4 border-t border-ayur-sand/60">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-ayur-charcoal uppercase tracking-wider">
                  Max Price
                </label>
                <span className="text-xs font-bold text-ayur-forest">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="149"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-ayur-forest"
              />
              <div className="flex justify-between text-[10px] text-ayur-stone mt-1">
                <span>₹149</span>
                <span>₹1500</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Control Bar */}
          <div className="p-4 rounded-2xl bg-white border border-ayur-sand/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-ayur-stone w-full sm:w-auto">
              <span className="font-bold text-ayur-forest">{filteredProducts.length}</span>
              <span>formulations found</span>
              {hasActiveFilters && (
                <span className="text-[11px] text-ayur-leaf bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Filters Active
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-ayur-cream border border-ayur-sand text-xs font-semibold text-ayur-forest"
              >
                <Filter className="w-3.5 h-3.5" /> Filters
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-ayur-stone hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-ayur-sand bg-white text-ayur-charcoal focus:outline-none focus:border-ayur-forest font-medium"
                >
                  <option value="featured">Featured / Curated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-ayur-sand space-y-4">
              <div className="w-16 h-16 rounded-full bg-ayur-cream mx-auto flex items-center justify-center text-ayur-stone">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-ayur-forest">
                No matching formulations found
              </h3>
              <p className="text-xs text-ayur-stone max-w-sm mx-auto">
                Try widening your price range, searching for different herbs like &apos;Ashwagandha&apos; or &apos;Oil&apos;, or resetting filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 rounded-xl bg-ayur-forest text-white text-xs font-semibold hover:bg-ayur-deep transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-ayur-sand">
              <h3 className="font-serif font-bold text-base text-ayur-forest">Filter Products</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-ayur-stone hover:text-ayur-forest"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-ayur-charcoal uppercase mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-ayur-sand"
              >
                <option value="all">All Products</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-ayur-charcoal uppercase mb-2">Dosha</label>
              <select
                value={selectedDosha}
                onChange={(e) => setSelectedDosha(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-ayur-sand"
              >
                <option value="all">All Doshas</option>
                <option value="Vata">Vata</option>
                <option value="Pitta">Pitta</option>
                <option value="Kapha">Kapha</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-ayur-charcoal uppercase mb-2">Max Price: ₹{maxPrice}</label>
              <input
                type="range"
                min="149"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-ayur-forest"
              />
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-ayur-forest text-white text-xs font-bold rounded-xl"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-ayur-stone">Loading Ayurvedic collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}

