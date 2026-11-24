'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { REVIEWS } from '@/data/reviews';
import { useCart } from '@/context/CartContext';
import SecureCheckoutBadge from '@/components/SecureCheckoutBadge';
import ProductCard from '@/components/ProductCard';
import {
  Star,
  ShoppingBag,
  Zap,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  MessageCircle,
  Plus,
  Minus,
  CheckCircle2,
  Leaf,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [selectedImage, setSelectedImage] = useState<string>(product?.image || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage' | 'reviews'>('benefits');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  // New review state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    notFound();
  }

  const inWishlist = isInWishlist(product.id);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  // Product specific reviews + generic
  const productReviews = REVIEWS.filter((r) => r.productId === product.id);
  const allReviewsForDisplay = productReviews.length > 0 ? productReviews : REVIEWS.slice(0, 2);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus(`Delivering to ${pincode} in 2-4 business days. Free shipping on this order!`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewComment.trim()) {
      setReviewSubmitted(true);
      setTimeout(() => {
        setNewReviewAuthor('');
        setNewReviewTitle('');
        setNewReviewComment('');
        setReviewSubmitted(false);
      }, 3500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-ayur-stone">
        <Link href="/" className="hover:text-ayur-forest transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-ayur-forest transition">
          Shop
        </Link>
        <span>/</span>
        <Link href={`/category/${product.categorySlug}`} className="hover:text-ayur-forest transition">
          {product.category}
        </Link>
        <span>/</span>
        <span className="font-semibold text-ayur-forest truncate max-w-[200px]">
          {product.name}
        </span>
      </div>

      {/* Main Product Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-ayur-sand shadow-sm">
            <Image
              src={selectedImage || product.image}
              alt={product.name}
              fill
              priority
              unoptimized
              className="object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white shadow-md">
                {discountPercent}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white text-ayur-stone hover:text-rose-600 transition"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 transition ${
                  inWishlist ? 'fill-rose-500 text-rose-500' : 'text-ayur-stone'
                }`}
              />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition flex-shrink-0 bg-white ${
                    selectedImage === img ? 'border-ayur-forest shadow-md' : 'border-ayur-sand/80 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="lg:col-span-6 space-y-5">
          {/* Category & Weight Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/category/${product.categorySlug}`}
              className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 uppercase tracking-wider hover:bg-emerald-100 transition"
            >
              {product.category}
            </Link>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-ayur-sand/60 text-ayur-forest">
              {product.sizeWeight}
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              {product.dosageForm}
            </span>
          </div>

          {/* Title & Tagline */}
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ayur-deep">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-ayur-stone italic mt-1">
              {product.tagline}
            </p>
          </div>

          {/* Rating & Review Jump */}
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-ayur-charcoal">{product.rating} / 5</span>
            <span className="text-xs text-ayur-stone">•</span>
            <button
              onClick={() => setActiveTab('reviews')}
              className="text-xs font-semibold text-ayur-leaf hover:underline"
            >
              ({product.reviewCount} Verified Reviews)
            </button>
          </div>

          {/* Dosha Suitability */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-ayur-charcoal">Dosha Suitability:</span>
            <div className="flex gap-1.5">
              {product.dosha.map((d) => (
                <span
                  key={d}
                  className="px-2 py-0.5 rounded bg-ayur-forest/10 text-ayur-forest font-medium text-[11px]"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-ayur-cream/60 border border-ayur-sand/80 flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-ayur-forest">
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <span className="text-base text-ayur-stone line-through">
                ₹{product.mrp}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Save ₹{product.mrp - product.price} ({discountPercent}% OFF)
            </span>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-ayur-charcoal">Quantity:</span>
              <div className="flex items-center border border-ayur-sand rounded-xl bg-white px-3 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-ayur-stone hover:text-ayur-forest"
                  aria-label="Decrease"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold px-3 text-ayur-forest min-w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-ayur-stone hover:text-ayur-forest"
                  aria-label="Increase"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs text-emerald-700 font-medium">
                {product.inStock ? `In Stock (${product.stockCount} units available)` : 'Out of Stock'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`py-3.5 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isAdded
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-white hover:bg-ayur-sand/40 border-2 border-ayur-forest text-ayur-forest'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-ayur-goldDark" /> Add to Cart
                  </>
                )}
              </button>

              <Link
                href={`/checkout?buyNow=${product.id}&qty=${quantity}`}
                onClick={() => addToCart(product, quantity)}
                className="py-3.5 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-ayur-forest via-ayur-emerald to-ayur-forest hover:brightness-110 text-white flex items-center justify-center gap-2 shadow-lg shadow-ayur-forest/20 transition-all"
              >
                <Zap className="w-4 h-4 text-ayur-goldLight" /> Buy Now
              </Link>
            </div>

            {/* WhatsApp Product Inquiry */}
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(
                `Namaste VEDAYU AMRIT! I would like to inquire about ${product.name} (₹${product.price}).`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" /> Inquire or Order on WhatsApp
            </a>
          </div>

          {/* Delivery & Pincode Checker */}
          <div className="p-4 rounded-2xl bg-white border border-ayur-sand/80 space-y-2">
            <label className="text-xs font-bold text-ayur-charcoal flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-ayur-goldDark" />
              Check Delivery & Cash on Delivery (COD)
            </label>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit PIN code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-ayur-sand focus:outline-none focus:border-ayur-leaf"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-ayur-forest text-white rounded-xl text-xs font-semibold hover:bg-ayur-deep transition"
              >
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p className="text-[11px] text-emerald-700 font-medium">{pincodeStatus}</p>
            )}
            <div className="flex items-center gap-4 pt-1 text-[11px] text-ayur-stone">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-ayur-goldDark" /> 100% Authentic
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-ayur-goldDark" /> 7-Day Easy Return
              </span>
            </div>
          </div>

          {/* 100% Secure Checkout Badge with Real Icons */}
          <SecureCheckoutBadge className="mt-4" />
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="bg-white rounded-3xl border border-ayur-sand/80 shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-ayur-sand/70 bg-ayur-cream/40 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-6 py-4 text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'benefits'
                ? 'text-ayur-forest border-b-2 border-ayur-forest bg-white'
                : 'text-ayur-stone hover:text-ayur-forest'
            }`}
          >
            <Sparkles className="w-4 h-4 text-ayur-gold" /> Benefits & Description
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`px-6 py-4 text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'ingredients'
                ? 'text-ayur-forest border-b-2 border-ayur-forest bg-white'
                : 'text-ayur-stone hover:text-ayur-forest'
            }`}
          >
            <Leaf className="w-4 h-4 text-ayur-gold" /> Key Ingredients
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`px-6 py-4 text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'usage'
                ? 'text-ayur-forest border-b-2 border-ayur-forest bg-white'
                : 'text-ayur-stone hover:text-ayur-forest'
            }`}
          >
            <Calendar className="w-4 h-4 text-ayur-gold" /> How to Use & Dosage
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'text-ayur-forest border-b-2 border-ayur-forest bg-white'
                : 'text-ayur-stone hover:text-ayur-forest'
            }`}
          >
            <Star className="w-4 h-4 text-ayur-gold" /> Customer Reviews ({product.reviewCount})
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-10">
          {activeTab === 'benefits' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-ayur-forest mb-2">
                  About {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-ayur-charcoal leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-sm font-bold text-ayur-forest mb-3">
                  Key Health Benefits:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-ayur-cream/40 border border-ayur-sand/50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-ayur-charcoal font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-ayur-sand/60">
                <h4 className="font-serif text-sm font-bold text-ayur-forest mb-2">
                  Quality & Safety Certifications:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-ayur-forest mb-2">
                  100% Active Botanical Ingredients
                </h3>
                <p className="text-xs text-ayur-stone leading-relaxed">
                  Formulated using classical Ayurvedic texts without artificial colors, petroleum derivatives, or synthetic fillers.
                </p>
              </div>

              <div className="divide-y divide-ayur-sand/60 border border-ayur-sand/60 rounded-2xl overflow-hidden">
                {product.ingredients.map((ing, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white hover:bg-ayur-cream/30 transition">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-ayur-forest">{ing.name}</h4>
                      {ing.purpose && (
                        <p className="text-[11px] text-ayur-stone mt-0.5">{ing.purpose}</p>
                      )}
                    </div>
                    {ing.percentage && (
                      <span className="px-2.5 py-1 rounded-lg bg-ayur-forest text-ayur-goldLight text-xs font-mono font-bold self-start sm:self-auto">
                        {ing.percentage}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-ayur-forest mb-2">
                  Suggested Dosage & Anupana (Carrier)
                </h3>
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs sm:text-sm text-ayur-charcoal leading-relaxed">
                  {product.usageInstructions}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-ayur-cream/50 border border-ayur-sand/60">
                  <h4 className="font-bold text-ayur-forest mb-1">Best Time of Day</h4>
                  <p className="text-ayur-stone">Early morning empty stomach or 30 minutes before sleep.</p>
                </div>
                <div className="p-4 rounded-xl bg-ayur-cream/50 border border-ayur-sand/60">
                  <h4 className="font-bold text-ayur-forest mb-1">Recommended Carrier</h4>
                  <p className="text-ayur-stone">Lukewarm water, A2 cow milk, or raw forest honey.</p>
                </div>
                <div className="p-4 rounded-xl bg-ayur-cream/50 border border-ayur-sand/60">
                  <h4 className="font-bold text-ayur-forest mb-1">Duration of Use</h4>
                  <p className="text-ayur-stone">Consume consistently for 6-12 weeks for optimal biological rejuvenation.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Existing Reviews */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-ayur-forest">
                  Verified Customer Feedback
                </h3>
                {allReviewsForDisplay.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-2xl border border-ayur-sand/70 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-ayur-stone">{rev.date}</span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-ayur-forest">{rev.title}</h4>
                    <p className="text-xs text-ayur-charcoal leading-relaxed">{rev.comment}</p>
                    <p className="text-[11px] font-semibold text-ayur-stone pt-1">
                      — {rev.author} {rev.verifiedBuyer && '• Verified Buyer'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add a Review Form */}
              <div className="p-6 rounded-2xl bg-ayur-cream/40 border border-ayur-sand/80 space-y-4">
                <h4 className="font-serif font-bold text-sm text-ayur-forest">
                  Write a Verified Customer Review
                </h4>
                {reviewSubmitted ? (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Dhanyavaad! Your review has been submitted for verification.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-ayur-charcoal">Your Rating:</span>
                      <div className="flex gap-1 text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className="p-1"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                star <= newReviewRating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-stone-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Name (e.g. Priya Sharma, Mumbai)"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="px-3 py-2 text-xs rounded-xl border border-ayur-sand bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Review Headline (e.g. Amazing results!)"
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        className="px-3 py-2 text-xs rounded-xl border border-ayur-sand bg-white"
                      />
                    </div>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your experience with this Ayurvedic remedy..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-ayur-sand bg-white"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-ayur-forest text-white rounded-xl text-xs font-semibold hover:bg-ayur-deep transition"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Ayurvedic Remedies */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between pb-3 border-b border-ayur-sand/80">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ayur-forest">
              Complementary Formulations
            </h2>
            <Link
              href={`/category/${product.categorySlug}`}
              className="text-xs font-semibold text-ayur-forest hover:text-emerald-700"
            >
              View More in {product.category} →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

