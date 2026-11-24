import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/data/blogs';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, MessageCircle } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostDetailPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-ayur-forest hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Knowledge Center
        </Link>
      </div>

      {/* Post Header */}
      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          {post.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ayur-forest leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-ayur-stone pt-2 border-b border-ayur-sand/80 pb-4">
          <span className="font-semibold text-ayur-charcoal">{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-ayur-cream shadow-md">
        <Image src={post.image} alt={post.title} fill priority className="object-cover" />
      </div>

      {/* Article Body */}
      <div className="prose prose-stone max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-ayur-charcoal font-sans pt-4">
        {post.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-ayur-sand/80 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-ayur-stone">Tags:</span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-ayur-cream text-xs text-ayur-forest border border-ayur-sand"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Ayurvedic Doctor Callout */}
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-bold text-base text-emerald-950">
            Have a question about this herbal remedy?
          </h4>
          <p className="text-xs text-emerald-800">
            Chat with our certified Ayurvedic Vaidyas on WhatsApp for personalized advice.
          </p>
        </div>
        <a
          href={`https://wa.me/919876543210?text=${encodeURIComponent(
            `Namaste, I was reading your article on "${post.title}" and would like to ask a question.`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs whitespace-nowrap transition"
        >
          Ask on WhatsApp
        </a>
      </div>

      {/* Related Reading */}
      {otherPosts.length > 0 && (
        <div className="pt-10 border-t border-ayur-sand space-y-6">
          <h3 className="font-serif text-xl font-bold text-ayur-forest">
            Recommended Vedic Reading
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPosts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group p-4 rounded-2xl bg-white border border-ayur-sand/70 space-y-2 hover:shadow-sm transition"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-ayur-cream">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-ayur-forest group-hover:text-emerald-700 line-clamp-2">
                  {p.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

