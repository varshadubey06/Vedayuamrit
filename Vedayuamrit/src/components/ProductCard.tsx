'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Heart, Star, ShoppingBag, Zap, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const discountPercent = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-ayur-sand/80 overflow-hidden shadow-sm hover:shadow-ayur transition-all duration-300 hover:-translate-y-1 font-sans">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {discountPercent > 0 && (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm tracking-wide uppercase">
            {discountPercent}% OFF
          </span>
        )}
        {product.isBestseller && (
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-ayur-forest text-ayur-goldLight border border-ayur-gold/40 shadow-sm uppercase tracking-wider">
            Bestseller
          </span>
        )}
        {product.isNewArrival && (
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-700 text-white shadow-sm uppercase tracking-wider">
            New
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        aria-label="Add to Wishlist"
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white text-ayur-stone hover:text-rose-600 transition duration-200"
      >
        <Heart
          className={`w-4 h-4 transition ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-ayur-stone'
            }`}
        />
      </button>

      {/* Product Image Link */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-square w-full overflow-hidden bg-ayur-cream/40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Weight Pill */}
          <div className="flex items-center justify-between text-xs text-ayur-stone mb-1.5 gap-2">
            <span className="text-[11px] font-bold text-ayur-emerald truncate uppercase tracking-wider">
              {product.categorySlug.replace(/-/g, ' ')}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-ayur-sand/60 text-ayur-forest font-bold whitespace-nowrap">
              {product.sizeWeight}
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-bold text-sm sm:text-base text-ayur-deep line-clamp-1 group-hover:text-ayur-leaf transition-colors tracking-tight">
              {product.name}
            </h3>
          </Link>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-ayur-stone line-clamp-1 mt-0.5 font-normal">
            {product.tagline}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-ayur-charcoal">{product.rating}</span>
            <span className="text-[11px] text-ayur-stone">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-ayur-sand/50">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-ayur-forest">
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-ayur-stone line-through">
                ₹{product.mrp}
              </span>
            )}
            <span className="text-[11px] text-emerald-700 font-bold ml-auto bg-emerald-50 px-1.5 py-0.5 rounded">
              Save ₹{product.mrp - product.price}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${isAdded
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-ayur-cream hover:bg-ayur-sand text-ayur-forest border border-ayur-sand'
                }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-ayur-goldDark" /> Add to Cart
                </>
              )}
            </button>

            <Link
              href={`/checkout?buyNow=${product.id}`}
              onClick={() => addToCart(product, 1)}
              className="w-full py-2 px-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-ayur-forest to-ayur-emerald hover:brightness-110 text-white flex items-center justify-center gap-1 shadow-sm transition"
            >
              <Zap className="w-3.5 h-3.5 text-ayur-goldLight" /> Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
