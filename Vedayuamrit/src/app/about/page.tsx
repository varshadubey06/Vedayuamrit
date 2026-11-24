'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Leaf,
  ShieldCheck,
  Award,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Banner */}
      <section className="relative bg-gradient-to-br from-ayur-deep via-ayur-forest to-ayur-deep text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-ayur-gold/40 text-ayur-goldLight text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-ayur-gold" />
            Our Sacred Vedic Origins
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            About VEDAYU AMRIT
          </h1>
          <p className="font-serif text-lg sm:text-2xl text-ayur-goldLight italic">
            Rooted in Ayurveda, Inspired by Nature.
          </p>
          <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto leading-relaxed pt-2">
            VEDAYU AMRIT is a premium Indian Herbal and Ayurvedic brand inspired by India’s ancient Ayurvedic traditions and natural ingredients. Our aim is to offer a wide range of herbal and Ayurvedic products, combining traditional knowledge, natural ingredients and modern product standards.
          </p>
        </div>
      </section>

      {/* 2. Brand Vision & Heritage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-ayur-sand bg-white p-2 group">
              <Image
                src="/images/heritage-mortar.jpg"
                alt="VEDAYU AMRIT Heritage"
                fill
                className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
              />
              {/* 100% Natural Seal */}
              <div className="absolute top-4 right-4 w-28 h-14 z-10 drop-shadow-xl">
                <Image
                  src="/images/badge-100-natural.png"
                  alt="100% Natural Guarantee"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-white shadow-xl border border-ayur-sand max-w-xs hidden sm:block">
              <p className="font-serif font-bold text-xs text-ayur-forest">100% Traditional Purity</p>
              <p className="text-[11px] text-ayur-stone">Crafted in classical copper vessels in Haridwar.</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
              The VEDAYU AMRIT Philosophy
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ayur-forest leading-tight">
              Reviving India&apos;s 5,000-Year Heritage of Holistic Balance
            </h2>
            <p className="text-xs sm:text-sm text-ayur-charcoal leading-relaxed">
              We want to establish <strong>VEDAYU AMRIT</strong> as a trusted Indian brand offering authentic products across multiple herbal and Ayurvedic categories. Our philosophy rests on the conviction that nature holds the answers to lasting cellular wellness and radiant vitality.
            </p>
            <p className="text-xs sm:text-sm text-ayur-stone leading-relaxed">
              Modern synthetic lifestyles often treat health as isolated quick-fixes. In contrast, Ayurveda views every individual as a microcosm of nature, governed by the Tridoshas (Vata, Pitta, Kapha). We harvest our botanicals strictly at their astronomical peak seasons and slow-cook our formulations in certified copper cauldrons to preserve sensitive bio-actives.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-ayur-sand/80 shadow-sm">
                <span className="font-serif font-bold text-lg text-ayur-forest">Classical Formulations</span>
                <p className="text-xs text-ayur-stone">From raw single herbs to classical Rasayanas.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-ayur-sand/80 shadow-sm">
                <span className="font-serif font-bold text-lg text-ayur-forest">AYUSH & GMP</span>
                <p className="text-xs text-ayur-stone">Manufactured under strict Pharmacopoeia standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 5 Pillars of Purity */}
      <section className="bg-ayur-cream/60 border-y border-ayur-sand py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider">
              Uncompromising Standards
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ayur-forest">
              The 5 Pillars of VEDAYU AMRIT
            </h2>
            <p className="text-xs sm:text-sm text-ayur-stone">
              Every drop and every scoop is held to our sacred commitment to purity and potency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-ayur-forest">
                1. Single-Origin Wild Herbs
              </h3>
              <p className="text-xs text-ayur-charcoal leading-relaxed">
                We source directly from organic co-operatives and tribal wildcrafters in Nagaur, Kannauj, and the pristine Himalayan foothills.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-ayur-forest">
                2. Classical Copper Cooking
              </h3>
              <p className="text-xs text-ayur-charcoal leading-relaxed">
                Following ancient Kshirpak and Taila Paka Vidhi, our herbal oils and Awalehas simmer slowly for up to 48 hours over wood fires.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-ayur-sand/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-ayur-forest">
                3. Heavy Metal Screened
              </h3>
              <p className="text-xs text-ayur-charcoal leading-relaxed">
                Every batch undergoes third-party HPLC testing ensuring 0% lead, arsenic, mercury, or harmful chemical adulterants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ayur-forest">
          Begin Your Ayurvedic Healing Journey Today
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/shop"
            className="px-6 py-3.5 rounded-xl bg-ayur-forest hover:bg-ayur-deep text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            Explore Ayurvedic Products
          </Link>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition"
          >
            <MessageCircle className="w-4 h-4" /> Free Ayurvedic Consultation
          </a>
        </div>
      </section>
    </div>
  );
}

