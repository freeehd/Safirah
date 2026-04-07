'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, ArrowRight, Bookmark } from 'lucide-react';

const pastel = {
  accent: 'var(--highlight-color, #e8b4a8)',
  text: 'var(--text-color, #57534E)',
  subtle: 'var(--subtle-accent, #FCD5CE)',
};

const container = 'mx-auto max-w-7xl px-5 sm:px-8';
const sectionY = 'py-14 md:py-20';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <div className="page-wrapper min-h-screen">
      {/* HERO */}
      <section className={`relative isolate overflow-hidden ${sectionY}`}>
        {/* Background blobs */}
        <motion.div
          className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl -z-10"
          style={{ background: 'radial-gradient(circle, rgba(252,213,206,0.55), transparent 60%)' }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-28 -left-10 h-80 w-80 rounded-full blur-3xl -z-10"
          style={{ background: 'radial-gradient(circle, rgba(250,210,225,0.5), transparent 65%)' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className={container}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm"
              style={{ borderColor: pastel.accent, backgroundColor: 'rgba(232,180,168,0.10)', color: pastel.text }}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>Insights & Resources</span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight mt-4" style={{ color: pastel.text }}>
              The <span style={{ color: pastel.accent }}>Blog</span>
            </h1>
            <p className="font-lato text-lg sm:text-xl leading-relaxed opacity-90 mt-6" style={{ color: pastel.text }}>
              Faith-aligned wisdom for Muslim women entrepreneurs. Mindset, business strategy, and spiritual growth — all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className={`${container} pb-10`}>
        <div className="flex flex-wrap gap-3 justify-center">
          <CategoryBadge label="All" active />
          {categories.map((category) => (
            <CategoryBadge key={category} label={category} />
          ))}
        </div>
      </section>

      {/* BLOG POSTS GRID */}
      <section className={`${container} ${sectionY} pt-0`}>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className={`${container} ${sectionY}`}>
        <Card className="border-0 rounded-3xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="p-10 bg-white/80 backdrop-blur">
              <h3 className="font-playfair text-3xl font-bold mb-4" style={{ color: pastel.text }}>
                Get Weekly Wisdom in Your Inbox
              </h3>
              <p className="font-lato text-lg opacity-90 mb-8" style={{ color: pastel.text }}>
                Join 2,000+ Muslim women entrepreneurs receiving faith-aligned business tips, mindset shifts, and exclusive resources.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-full border-2 px-6 py-4 text-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: pastel.accent }}
                />
                <button
                  type="submit"
                  className="w-full rounded-full px-8 py-4 text-lg font-bold text-white transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: 'var(--cta-color,#FFB5A7)' }}
                >
                  Subscribe Free →
                </button>
              </form>
              <p className="text-xs mt-4 opacity-60" style={{ color: pastel.text }}>
                No spam. Unsubscribe anytime.
              </p>
            </div>
            <div
              className="relative p-10 flex items-center justify-center"
              style={{ background: 'linear-gradient(160deg,#fde2e4,#fad2e1)' }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📬</div>
                <p className="font-playfair text-2xl italic" style={{ color: pastel.text }}>
                  "The emails are always so timely. It's like Hirah reads my mind!"
                </p>
                <p className="mt-4 text-sm opacity-70" style={{ color: pastel.text }}>
                  — Fatima K., Entrepreneur
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  );
}

/* ——— Components ——— */

function CategoryBadge({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
        active
          ? 'text-white shadow-md'
          : 'text-[color:var(--text-color,#57534E)] hover:shadow-sm'
      }`}
      style={
        active
          ? { backgroundColor: pastel.accent }
          : { backgroundColor: 'rgba(232,180,168,0.15)', border: `1px solid ${pastel.accent}` }
      }
    >
      {label}
    </button>
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="border-0 rounded-3xl overflow-hidden shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2 ring-1 bg-white/90 backdrop-blur"
          style={{ borderColor: 'rgba(232,180,168,0.2)' }}>
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#FCD5CE] to-[#FEC89A]">
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              📝
            </div>
            {/* Category Badge */}
            <div
              className="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ backgroundColor: pastel.accent }}
            >
              {post.category}
            </div>
          </div>

          {/* Content */}
          <CardContent className="p-6 space-y-4">
            {/* Meta */}
            <div className="flex items-center gap-4 text-xs opacity-70" style={{ color: pastel.text }}>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-playfair text-xl font-bold leading-tight group-hover:text-[#9C7A1A] transition-colors"
              style={{ color: pastel.text }}>
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="font-lato text-sm opacity-90 leading-relaxed" style={{ color: pastel.text }}>
              {post.excerpt}
            </p>

            {/* Read More */}
            <div className="pt-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
              style={{ color: pastel.accent }}>
              Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
