import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Sparkles, ArrowLeft, ShieldCheck, Leaf } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export default function CategoryDetailPage({ params }: Props) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  // Find matching products
  const categoryProducts = PRODUCTS.filter((p) => {
    if (params.slug === 'herbal-products') return true; // All herbal products
    if (params.slug === 'herbal-oils') {
      return (
        p.subCategory === 'Herbal Oils' ||
        p.dosageForm.toLowerCase().includes('oil') ||
        p.name.toLowerCase().includes('oil')
      );
    }
    if (params.slug === 'herbal-powders-churnas') {
      return (
        p.subCategory === 'Herbal Powders & Churnas' ||
        p.dosageForm.toLowerCase().includes('powder') ||
        p.dosageForm.toLowerCase().includes('churna')
      );
    }
    if (params.slug === 'ayurvedic-products') {
      return p.categorySlug === 'ayurvedic-products';
    }
    if (params.slug === 'herbal-juices') {
      return p.categorySlug === 'herbal-juices';
    }
    if (params.slug === 'skin-care') {
      return p.categorySlug === 'skin-care';
    }
    if (params.slug === 'hair-care') {
      return p.categorySlug === 'hair-care';
    }
    if (params.slug === 'personal-care') {
      return p.categorySlug === 'personal-care';
    }
    return p.categorySlug === params.slug;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-ayur-stone">
        <Link href="/" className="hover:text-ayur-forest transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-ayur-forest transition">
          Categories
        </Link>
        <span>/</span>
        <span className="font-semibold text-ayur-forest">{category.name}</span>
      </div>

      {/* Hero Category Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-ayur-deep via-ayur-forest to-ayur-deep text-white shadow-xl min-h-[260px] flex items-center">
        <div className="absolute inset-0 opacity-25">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ayur-deep via-ayur-forest/90 to-transparent" />

        <div className="relative z-10 p-6 sm:p-12 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-ayur-gold/40 text-ayur-goldLight text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
            VEDAYU AMRIT Apothecary
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            {category.description}
          </p>

          {/* Featured Herbs in this Category */}
          {category.featuredHerbs && category.featuredHerbs.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-ayur-goldLight">Key Botanicals:</span>
              {category.featuredHerbs.map((herb) => (
                <span
                  key={herb}
                  className="px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] text-white/90 border border-white/20"
                >
                  {herb}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-ayur-sand/80">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ayur-forest">
              {category.name} Formulations
            </h2>
            <p className="text-xs text-ayur-stone">
              Showing {categoryProducts.length} authentic handcrafted items
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-ayur-forest hover:text-emerald-700 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Categories
          </Link>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-ayur-sand space-y-3">
            <Leaf className="w-10 h-10 text-ayur-stone mx-auto" />
            <p className="text-sm text-ayur-forest font-semibold">New formulations arriving soon for this category.</p>
            <Link href="/shop" className="inline-block px-4 py-2 bg-ayur-forest text-white text-xs rounded-xl">
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

