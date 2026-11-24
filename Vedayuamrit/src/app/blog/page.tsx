import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogs';
import { Sparkles, ArrowRight, Calendar, User, Clock } from 'lucide-react';

export default function BlogIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-ayur-leaf uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
          Vedic Pharmacopoeia Journal
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ayur-forest">
          Ayurvedic Knowledge & Articles
        </h1>
        <p className="text-xs sm:text-sm text-ayur-stone leading-relaxed">
          Deepen your understanding of classical Dinacharya, herbs, Tridosha balance, and natural living written by experienced Ayurvedic Vaidyas.
        </p>
      </div>

      {/* Featured Lead Post */}
      {BLOG_POSTS[0] && (
        <div className="rounded-3xl overflow-hidden bg-white border border-ayur-sand/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-6 sm:p-8">
          <div className="lg:col-span-6 relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden bg-ayur-cream">
            <Image
              src={BLOG_POSTS[0].image}
              alt={BLOG_POSTS[0].title}
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {BLOG_POSTS[0].category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ayur-forest hover:text-emerald-700 transition">
              <Link href={`/blog/${BLOG_POSTS[0].slug}`}>{BLOG_POSTS[0].title}</Link>
            </h2>
            <p className="text-xs sm:text-sm text-ayur-charcoal leading-relaxed">
              {BLOG_POSTS[0].excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-ayur-stone pt-2 border-t border-ayur-sand/60">
              <span>{BLOG_POSTS[0].author}</span>
              <span>•</span>
              <span>{BLOG_POSTS[0].date}</span>
              <span>•</span>
              <span>{BLOG_POSTS[0].readTime}</span>
            </div>
            <div>
              <Link
                href={`/blog/${BLOG_POSTS[0].slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ayur-forest hover:bg-ayur-deep text-white text-xs font-semibold transition"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 text-ayur-goldLight" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {BLOG_POSTS.slice(1).map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl overflow-hidden bg-white border border-ayur-sand/80 shadow-sm hover:shadow-ayur transition-all duration-300 flex flex-col justify-between"
          >
            <div>
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
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-ayur-stone">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif font-bold text-base text-ayur-deep group-hover:text-ayur-leaf transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-ayur-stone line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>
            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-ayur-sand/60 flex items-center justify-between text-xs font-semibold text-ayur-forest">
                <span>Read Article</span>
                <span className="text-ayur-gold group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

