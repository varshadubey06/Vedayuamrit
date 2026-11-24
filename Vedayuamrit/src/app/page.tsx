'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { BLOG_POSTS } from '@/data/blogs';
import { REVIEWS } from '@/data/reviews';
import ProductCard from '@/components/ProductCard';
import SecureCheckoutBadge from '@/components/SecureCheckoutBadge';
import {
  ArrowRight,
  ShieldCheck,
  Leaf,
  HeartHandshake,
  CheckCircle2,
  Award,
  Flame,
  Wind,
  Droplets,
  Star,
  MessageCircle,
  Truck,
  RotateCcw,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const [activeDosha, setActiveDosha] = useState<'Vata' | 'Pitta' | 'Kapha'>('Vata');

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
  const bestSellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  const keyIngredients = [
    {
      name: 'Ashwagandha',
      sanskrit: 'Withania Somnifera',
      role: 'King of Adaptogens',
      benefit: 'Reduces cortisol, boosts stamina & restores deep restorative sleep.',
      image: '/images/products/ashwagandha-powder.jpg',
    },
    {
      name: 'Wild Amla',
      sanskrit: 'Emblica Officinalis',
      role: 'Vitamin C Treasure',
      benefit: 'Tridoshic Rasayana for cellular immunity and lustrous hair growth.',
      image: '/images/products/amla-powder.jpg',
    },
    {
      name: 'Krishna Tulsi',
      sanskrit: 'Ocimum Sanctum',
      role: 'Queen of Herbs',
      benefit: 'Sacred adaptogen clearing respiratory airways and daily stress.',
      image: '/images/products/tulsi-drops.jpg',
    },
    {
      name: 'Bhringraj',
      sanskrit: 'Eclipta Alba',
      role: 'Keshraj (Ruler of Hair)',
      benefit: 'Revives dormant hair follicles and arrests shedding effectively.',
      image: '/images/products/bhringraj-oil.jpg',
    },
    {
      name: 'Mysore Chandan',
      sanskrit: 'Santalum Album',
      role: 'Cooling Radiance',
      benefit: 'Soothes inflamed skin and restores luminous bridal golden glow.',
      image: '/images/products/sandalwood-face-pack.jpg',
    },
    {
      name: 'Neem',
      sanskrit: 'Azadirachta Indica',
      role: 'Sarva Roga Nivarini',
      benefit: 'Deep blood purifier that clears persistent skin blemishes.',
      image: '/images/products/neem-juice.jpg',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 font-sans">
      {/* 1. Main Hero Banner - True Full Screen Viewport */}
      <section className="relative min-h-[520px] lg:h-[calc(100vh-72px)] lg:max-h-[820px] flex items-center text-white overflow-hidden">
        {/* Background Image - Emerald Botanical Flatlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/vedayu-hero-banner.jpg"
            alt="VEDAYU AMRIT Luxurious Ayurvedic Background"
            fill
            priority
            unoptimized
            className="object-cover object-center brightness-75 scale-102"
          />
          {/* Subtle gradient vignette for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-ayur-deep/95 via-ayur-deep/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ayur-deep via-transparent to-black/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-0 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  Rooted in Ayurveda, <br />
                  <span className="gold-gradient-text italic font-serif">Inspired by Nature.</span>
                </h1>
              </div>

              <p className="text-xs sm:text-sm text-white/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover authentic single-herb powders, cold-pressed oils, clarifying botanical juices, and classical Rasayanas cooked in traditional copper vessels following ancient Charaka Samhita guidelines.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <Link
                  href="/shop"
                  className="px-5 sm:px-6 py-3 rounded-2xl bg-gradient-to-r from-ayur-gold to-ayur-goldDark hover:from-ayur-goldLight hover:to-ayur-gold text-ayur-deep font-bold text-xs sm:text-sm tracking-wide shadow-gold hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/category/ayurvedic-products"
                  className="px-4 sm:px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-xs sm:text-sm transition"
                >
                  Ayurvedic Health
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/15 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="block text-xl sm:text-2xl font-extrabold gold-gradient-text">100%</span>
                  <span className="text-[11px] text-white/70 font-medium">Authentic Herbs</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-extrabold gold-gradient-text">Pure</span>
                  <span className="text-[11px] text-white/70 font-medium">&amp; Natural</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-extrabold gold-gradient-text">AYUSH</span>
                  <span className="text-[11px] text-white/70 font-medium">GMP Approved</span>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase Card - Flagship Classical Rasayanas (Ashwagandha, Tulsi, Brahmi) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-ayur-gold/40 bg-black/40 p-2 backdrop-blur-sm group">
                <Image
                  src="/images/vedayu-bottles-hero.jpg"
                  alt="VEDAYU AMRIT Classical Rasayanas - Ashwagandha, Tulsi & Brahmi"
                  fill
                  priority
                  unoptimized
                  className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />

                {/* 100% Natural Stamp Badge */}
                <div className="absolute top-3 right-3 w-24 sm:w-28 h-12 sm:h-14 z-20 drop-shadow-2xl">
                  <Image
                    src="/images/badge-100-natural.png"
                    alt="100% Natural Formulation Seal"
                    fill
                    priority
                    unoptimized
                    className="object-contain"
                  />
                </div>

                {/* Floating pill badge */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-2xl bg-black/80 backdrop-blur-md border border-ayur-gold/40 text-white text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
                      <Leaf className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-[11px]">Flagship Ayurvedic Rasayanas</p>
                      <p className="text-[9px] text-ayur-goldLight">Ashwagandha • Tulsi • Brahmi</p>
                    </div>
                  </div>
                  <Link
                    href="/product/ashwagandha-powder"
                    className="text-[11px] font-bold text-ayur-gold hover:text-amber-200 transition whitespace-nowrap bg-white/10 px-2 py-1 rounded-lg border border-ayur-gold/30"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
            Holistic Categorization
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-ayur-forest">
            Shop by Ayurvedic Category
          </h2>
          <p className="text-xs sm:text-sm text-ayur-stone">
            Select from ancient single-herb churnas, clarifying juices, pure essential oils, and rejuvenating daily botanicals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-ayur-sand/80 shadow-sm hover:shadow-ayur transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ayur-cream/40">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ayur-deep/85 via-black/25 to-transparent" />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-ayur-forest shadow-sm">
                  {cat.itemCount} Items
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-ayur-goldLight transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </div>
              <div className="p-3.5 text-xs text-ayur-stone bg-white flex-1 flex flex-col justify-between">
                <p className="line-clamp-2 text-[11px] mb-2">{cat.description}</p>
                <div className="flex items-center text-ayur-forest font-bold text-[11px] group-hover:text-emerald-700">
                  <span>Explore category</span>
                  <span className="ml-1 text-ayur-gold group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Products with newly generated branded cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-ayur-sand/70 gap-4">
          <div>
            <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
              Handcrafted Potency
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ayur-forest">
              Featured Ayurvedic Formulations
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-ayur-forest hover:text-emerald-700 flex items-center gap-1 group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 text-ayur-gold group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Brand Heritage & Story Banner */}
      <section className="bg-gradient-to-r from-ayur-cream via-ayur-sand/40 to-ayur-cream border-y border-ayur-sand/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Image - Classical Granite Mortar & Botanicals */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-ayur-sand bg-white p-1 group">
                <Image
                  src="/images/heritage-mortar.jpg"
                  alt="VEDAYU AMRIT Classical Granite Mortar & Botanical Extraction"
                  fill
                  className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
                {/* 100% Natural Stamp Badge Overlay */}
                <div className="absolute top-3 right-3 w-24 sm:w-28 h-12 sm:h-14 z-10 drop-shadow-lg">
                  <Image
                    src="/images/badge-100-natural.png"
                    alt="100% Natural Certified"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block p-4 rounded-2xl bg-white shadow-xl border border-ayur-sand max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-ayur-forest text-ayur-gold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-ayur-forest">Charaka Samhita Inspired</h4>
                    <p className="text-[10px] text-ayur-stone">Strict copper vessel cooking and whole plant bio-actives.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ayur-forest/10 text-ayur-forest text-xs font-semibold">
                <Leaf className="w-3.5 h-3.5 text-ayur-leaf" />
                Our Sacred Heritage
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-ayur-deep leading-tight">
                Rooted in 5,000 Years of Vedic Knowledge, Refined for Modern Living.
              </h2>

              <p className="text-xs sm:text-sm text-ayur-charcoal leading-relaxed">
                At <strong>VEDAYU AMRIT</strong>, we believe true wellness is not about suppressing symptoms—it is about restoring the delicate constitutional balance between body, mind, and the elements.
              </p>

              <p className="text-xs sm:text-sm text-ayur-stone leading-relaxed">
                From harvesting wild Amla in the dense forests of Madhya Pradesh to slow-boiling therapeutic Kshirpak oils in copper vessels, our formulations honor the sacred classical recipes of Charaka Samhita and Sushruta Samhita, free from synthetic chemicals, silicones, and parabens.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-ayur-sand">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-ayur-forest">Zero Mineral Oils</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-ayur-forest">Cold-Stone Pulverized</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-ayur-forest">100% Cruelty Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-ayur-forest">Copper Vessel Made</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-ayur-forest">Third-Party Lab Tested</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-ayur-forest">AYUSH Certified</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-ayur-forest hover:text-emerald-700 underline underline-offset-4"
                >
                  Read our full founding story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4B. Classical Ayurvedic Rituals Showcase (Skin Care & Herbal Oils) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
            Holistic Self-Care Rituals
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-ayur-forest">
            Classical Beauty &amp; Rejuvenation
          </h2>
          <p className="text-xs sm:text-sm text-ayur-stone">
            Nourish skin radiance and hair longevity with time-tested botanical therapies passed down through generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Ayurvedic Skin Care Mukhalepa (Image 1) */}
          <div className="group relative rounded-3xl overflow-hidden shadow-xl border border-ayur-sand bg-white flex flex-col hover:shadow-2xl transition-all duration-300">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-ayur-cream">
              <Image
                src="/images/skincare-facial.jpg"
                alt="VEDAYU AMRIT Ayurvedic Skin Care Mukhalepa Ritual"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ayur-deep/90 via-ayur-deep/30 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-ayur-forest text-xs font-bold shadow-md">
                ✨ Mukhalepa &amp; Radiant Glow
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-1">
                  Ayurvedic Skin Care &amp; Ubtans
                </h3>
                <p className="text-xs sm:text-sm text-white/85 line-clamp-2">
                  Infused with Wild Turmeric, Mysore Chandan, Multani Mitti, and soothing pure Aloe Vera for luminous cellular radiance.
                </p>
              </div>
            </div>
            <div className="p-5 sm:p-6 flex items-center justify-between bg-white border-t border-ayur-sand/50">
              <div>
                <p className="text-xs font-bold text-ayur-forest">100% Chemical-Free Radiance</p>
                <p className="text-[11px] text-ayur-stone">Face Packs, Gels, scrubs &amp; toners</p>
              </div>
              <Link
                href="/category/skin-care"
                className="px-5 py-2.5 rounded-xl bg-ayur-forest hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition hover:scale-102"
              >
                <span>Explore Skin Care</span>
                <ArrowRight className="w-4 h-4 text-ayur-gold" />
              </Link>
            </div>
          </div>

          {/* Card 2: Herbal Oils & Kshirpak Tailas (Image 3) */}
          <div className="group relative rounded-3xl overflow-hidden shadow-xl border border-ayur-sand bg-white flex flex-col hover:shadow-2xl transition-all duration-300">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-ayur-cream">
              <Image
                src="/images/herbal-oils-tray.jpg"
                alt="VEDAYU AMRIT Classical Kshirpak Herbal Oils & Hibiscus Infusions"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ayur-deep/90 via-ayur-deep/30 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-ayur-forest text-xs font-bold shadow-md">
                🌿 Kshirpak Taila Tradition
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-1">
                  Classical Herbal Oils &amp; Abhyanga
                </h3>
                <p className="text-xs sm:text-sm text-white/85 line-clamp-2">
                  Slow-simmered in cold-pressed sesame and virgin coconut with Bhringraj, Amla, Brahmi, and hibiscus for root strength.
                </p>
              </div>
            </div>
            <div className="p-5 sm:p-6 flex items-center justify-between bg-white border-t border-ayur-sand/50">
              <div>
                <p className="text-xs font-bold text-ayur-forest">Cold-Pressed Botanical Elixirs</p>
                <p className="text-[11px] text-ayur-stone">Hair Oils, Massage Oils &amp; Tailas</p>
              </div>
              <Link
                href="/category/herbal-oils"
                className="px-5 py-2.5 rounded-xl bg-ayur-forest hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition hover:scale-102"
              >
                <span>Explore Herbal Oils</span>
                <ArrowRight className="w-4 h-4 text-ayur-gold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-ayur-sand/70 gap-4">
          <div>
            <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
              Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ayur-forest">
              Best Selling Remedies
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-ayur-forest hover:text-emerald-700 flex items-center gap-1 group"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 text-ayur-gold group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Natural Ingredients Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
            Botanical Wisdom
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-ayur-forest">
            Our Revered Natural Ingredients
          </h2>
          <p className="text-xs sm:text-sm text-ayur-stone">
            Every product in VEDAYU AMRIT is powered by single-origin, wildcrafted herbs renowned in the classical Ayurvedic pharmacopoeia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyIngredients.map((ing) => (
            <div
              key={ing.name}
              className="p-5 rounded-2xl bg-white border border-ayur-sand/80 shadow-sm hover:shadow-md transition flex items-start gap-4"
            >
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-ayur-cream flex-shrink-0 border border-ayur-sand">
                <Image
                  src={ing.image}
                  alt={ing.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-ayur-goldDark uppercase tracking-wider">
                  {ing.role}
                </span>
                <h3 className="font-bold text-base text-ayur-forest">{ing.name}</h3>
                <p className="text-[11px] text-ayur-stone italic -mt-0.5 mb-1">{ing.sanskrit}</p>
                <p className="text-xs text-ayur-charcoal leading-relaxed">{ing.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Tridosha Explorer with Botanical Prakriti Anatomy Map */}
      <section className="bg-gradient-to-b from-ayur-deep via-[#0d2a1b] to-ayur-deep text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-ayur-gold uppercase tracking-wider">
              Vedic Physiology &amp; Prakriti Map
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Discover Tridosha Harmony
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              According to Ayurveda, health is the equilibrium of three biological energies (Doshas). Select your dominant constitution below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Centerpiece: Botanical Human Body Anatomy (Image 6) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-ayur-gold/40 bg-black/50 p-2 backdrop-blur-md group">
                <Image
                  src="/images/ayurveda-dosha-body.jpg"
                  alt="VEDAYU AMRIT Tridosha Botanical Energy Anatomy"
                  fill
                  className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/80 backdrop-blur-md border border-ayur-gold/30 text-center">
                  <p className="text-xs font-bold text-ayur-goldLight">Constitutional Prakriti Map</p>
                  <p className="text-[10px] text-white/80">Air &amp; Space (Vata) • Fire &amp; Water (Pitta) • Earth &amp; Water (Kapha)</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Dosha Energy Cards */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setActiveDosha('Vata')}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition ${activeDosha === 'Vata'
                    ? 'bg-ayur-gold text-ayur-deep shadow-gold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                >
                  <Wind className="w-4 h-4" /> Vata (Air &amp; Space)
                </button>
                <button
                  onClick={() => setActiveDosha('Pitta')}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition ${activeDosha === 'Pitta'
                    ? 'bg-ayur-gold text-ayur-deep shadow-gold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                >
                  <Flame className="w-4 h-4" /> Pitta (Fire &amp; Water)
                </button>
                <button
                  onClick={() => setActiveDosha('Kapha')}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition ${activeDosha === 'Kapha'
                    ? 'bg-ayur-gold text-ayur-deep shadow-gold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                >
                  <Droplets className="w-4 h-4" /> Kapha (Earth &amp; Water)
                </button>
              </div>

              <div className="bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
                {activeDosha === 'Vata' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-ayur-goldLight">
                          Vata Dosha: The Kinetic Force
                        </h3>
                        <p className="text-xs text-white/60">Governed by Air &amp; Ether • Movement &amp; Nervous System</p>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-amber-500/20 text-ayur-gold border border-amber-400/30">
                        <Wind className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      Vata controls respiration, cellular movement, and nerve impulses. When aggravated by stress or dry cold winds, it leads to insomnia, dry skin, restlessness, and joint discomfort.
                    </p>
                    <div className="pt-2">
                      <p className="text-xs font-bold text-ayur-gold uppercase tracking-wider mb-2">
                        Recommended VEDAYU AMRIT Formulations:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">Ashwagandha Powder</span>
                        <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">Brahmi</span>
                        <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">Warm Sesame Massage Oil</span>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3">
                      <div className="text-ayur-gold font-bold text-xs uppercase tracking-wider flex-shrink-0">
                        Balancing Principle:
                      </div>
                      <p className="text-xs text-white/80">Nourish with warm, oily, grounding, and sweet-salty classical tonics.</p>
                    </div>
                  </div>
                )}

                {activeDosha === 'Pitta' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-ayur-goldLight">
                          Pitta Dosha: The Transformative Flame
                        </h3>
                        <p className="text-xs text-white/60">Governed by Fire &amp; Water • Metabolism &amp; Digestion</p>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                        <Flame className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      Pitta oversees metabolism, digestion (Agni), cellular transformation, and body heat. When elevated, it creates acid reflux, skin eruptions, and premature hair thinning.
                    </p>
                    <div className="pt-2">
                      <p className="text-xs font-bold text-ayur-gold uppercase tracking-wider mb-2">
                        Recommended VEDAYU AMRIT Formulations:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">Shatavari</span>
                        <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">Kannauj Pure Rose Water</span>
                        <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">Aloe Vera Juice</span>
                        <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">Pure Neem</span>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3">
                      <div className="text-ayur-gold font-bold text-xs uppercase tracking-wider flex-shrink-0">
                        Balancing Principle:
                      </div>
                      <p className="text-xs text-white/80">Soothe with cooling, bitter, sweet botanicals and calm surroundings.</p>
                    </div>
                  </div>
                )}

                {activeDosha === 'Kapha' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-ayur-goldLight">
                          Kapha Dosha: The Structural Anchor
                        </h3>
                        <p className="text-xs text-white/60">Governed by Earth &amp; Water • Stamina &amp; Immunity (Ojas)</p>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                        <Droplets className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      Kapha provides biological stability, joint lubrication, endurance, and deep cellular immunity (Ojas). Excess Kapha manifests as lethargy, sluggish metabolism, and mucus congestion.
                    </p>
                    <div className="pt-2">
                      <p className="text-xs font-bold text-ayur-gold uppercase tracking-wider mb-2">
                        Recommended VEDAYU AMRIT Formulations:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">Triphala Churna</span>
                        <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">Moringa Leaf Powder</span>
                        <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">Ayush Kwath Kadha</span>
                        <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">Tulsi Drops</span>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3">
                      <div className="text-ayur-gold font-bold text-xs uppercase tracking-wider flex-shrink-0">
                        Balancing Principle:
                      </div>
                      <p className="text-xs text-white/80">Stimulate with pungent, astringent, warming spices and active vigor.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-ayur-sand/70 gap-4">
          <div>
            <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
              Fresh Batches
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ayur-forest">
              New Ayurvedic Arrivals
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-ayur-forest hover:text-emerald-700 flex items-center gap-1 group"
          >
            <span>See All Products</span>
            <ArrowRight className="w-4 h-4 text-ayur-gold group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. Customer Reviews & Ratings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
            Real Stories, Real Healing
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-ayur-forest">
            Trusted by 50,000+ Families Across India
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-amber-500 pt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm font-bold text-ayur-charcoal ml-1">4.9 / 5 Overall Brand Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-ayur-sand/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h3 className="font-bold text-sm text-ayur-forest mb-2">
                  &ldquo;{rev.title}&rdquo;
                </h3>
                <p className="text-xs text-ayur-charcoal leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ayur-sand/60 flex items-center justify-between text-[11px]">
                <div>
                  <p className="font-bold text-ayur-deep">{rev.author}</p>
                  <p className="text-ayur-stone">{rev.date}</p>
                </div>
                {rev.verifiedBuyer && (
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Ayurvedic Knowledge & Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-ayur-sand/70 gap-4">
          <div>
            <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
              Vedic Wisdom Journal
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ayur-forest">
              Ayurvedic Knowledge &amp; Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs sm:text-sm font-bold text-ayur-forest hover:text-emerald-700 flex items-center gap-1 group"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="w-4 h-4 text-ayur-gold group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl overflow-hidden bg-white border border-ayur-sand/80 shadow-sm hover:shadow-ayur transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-ayur-cream">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-ayur-forest/90 text-white backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-ayur-stone mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-ayur-deep group-hover:text-ayur-leaf transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-ayur-stone line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-ayur-sand/60 flex items-center justify-between text-xs font-bold text-ayur-forest">
                  <span>Read Article</span>
                  <span className="text-ayur-gold group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 10. 100% Secure Checkout Trust Strip with Real Icons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SecureCheckoutBadge />
      </section>

      {/* 11. WhatsApp Doctor Consultation Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-ayur-forest to-emerald-900 text-white p-8 sm:p-12 shadow-2xl border-2 border-ayur-gold/30 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wide">
                Free Ayurvedic Vaidya Consultation
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Unsure Which Herbal Formulation Fits Your Body Type?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
                Chat directly with our certified Ayurvedic doctors on WhatsApp. Get personalized dosage advice, dietary recommendations, and health plans tailored to your Prakriti.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                <MessageCircle className="w-5 h-5 text-emerald-950" /> Chat on WhatsApp Now
              </a>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm text-center transition"
              >
                Book a Callback
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
}
