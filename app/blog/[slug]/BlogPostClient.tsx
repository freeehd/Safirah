'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Footer from '@/components/Footer';

const pastel = {
  accent: 'var(--highlight-color, #e8b4a8)',
  text: 'var(--text-color, #57534E)',
  subtle: 'var(--subtle-accent, #FCD5CE)',
};

const container = 'mx-auto max-w-4xl px-5 sm:px-8';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
}

interface BlogPostClientProps {
  post: BlogPost;
  slug: string;
}

export default function BlogPostClient({ post, slug }: BlogPostClientProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`,
  };

  return (
    <div className="page-wrapper min-h-screen">
      {/* HEADER */}
      <section className="relative isolate overflow-hidden py-14 md:py-20">
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
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors hover:text-[color:var(--highlight-color,#e8b4a8)]"
            style={{ color: pastel.text }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Category Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm mb-6"
            style={{ borderColor: pastel.accent, backgroundColor: 'rgba(232,180,168,0.10)', color: pastel.text }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: pastel.accent }} />
            <span>{post.category}</span>
          </div>

          {/* Title */}
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight mb-6"
            style={{ color: pastel.text }}>
            {post.title}
          </h1>

          {/* Description */}
          <p className="font-lato text-xl leading-relaxed opacity-90 mb-8 max-w-3xl"
            style={{ color: pastel.text }}>
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm opacity-80" style={{ color: pastel.text }}>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: pastel.accent }} />
              {post.author}
            </span>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 mt-8 pt-8 border-t" style={{ borderColor: 'rgba(232,180,168,0.3)' }}>
            <span className="text-sm font-semibold mr-2" style={{ color: pastel.text }}>Share:</span>
            <ShareButton href={shareLinks.facebook} icon={<Facebook className="h-4 w-4" />} label="Facebook" />
            <ShareButton href={shareLinks.twitter} icon={<Twitter className="h-4 w-4" />} label="Twitter" />
            <ShareButton href={shareLinks.linkedin} icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
          </div>
        </div>
      </section>

      {/* FEATURED IMAGE */}
      <section className={`${container} py-8`}>
        <div
          className="relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-xl ring-1"
          style={{ borderColor: 'rgba(232,180,168,0.2)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FCD5CE] to-[#FEC89A] flex items-center justify-center">
            <span className="text-8xl">📝</span>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <article className={`${container} py-14 md:py-20`}>
        <div className="prose prose-lg max-w-none">
          {/* Placeholder content - replace with actual blog post content */}
          <div className="font-lato leading-relaxed space-y-6" style={{ color: pastel.text }}>
            <p className="text-xl">
              [Blog post content would go here. This is a placeholder for the actual article content.]
            </p>
            <p>
              In this article, we'll explore faith-aligned approaches to overcoming common challenges faced by Muslim women entrepreneurs.
            </p>
            <h2 className="font-playfair text-3xl font-bold mt-12 mb-6" style={{ color: pastel.text }}>
              Key Takeaways
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: pastel.accent }} />
                <span>Takeaway point 1 would go here</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: pastel.accent }} />
                <span>Takeaway point 2 would go here</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: pastel.accent }} />
                <span>Takeaway point 3 would go here</span>
              </li>
            </ul>
            <h2 className="font-playfair text-3xl font-bold mt-12 mb-6" style={{ color: pastel.text }}>
              Conclusion
            </h2>
            <p>
              Remember, your journey is unique. Trust in Allah's plan, take consistent action, and don't be afraid to ask for help along the way.
            </p>
            <div className="mt-12 p-6 rounded-2xl" style={{ backgroundColor: 'rgba(232,180,168,0.1)' }}>
              <p className="font-playfair text-lg italic" style={{ color: pastel.text }}>
                "Strategy blooms when it's paired with softness. True change is gentle, consistent, and full of faith."
              </p>
              <p className="mt-3 text-sm font-semibold" style={{ color: pastel.text }}>
                — Hirah Safi
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className={`${container} py-14`}>
        <div className="rounded-3xl p-10 text-center" style={{ background: 'linear-gradient(160deg,#fde2e4,#fad2e1)' }}>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4" style={{ color: pastel.text }}>
            Ready to Transform Your Mindset?
          </h2>
          <p className="font-lato text-lg opacity-90 mb-8 max-w-2xl mx-auto" style={{ color: pastel.text }}>
            Book a 1:1 coaching session with Hirah and get personalized guidance on your entrepreneurial journey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-full px-8 py-4 text-lg font-bold text-white transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--cta-color,#FFB5A7)' }}
            >
              Book a Session →
            </Link>
            <Link
              href="/services"
              className="rounded-full px-8 py-4 text-lg font-bold transition-all hover:shadow-md"
              style={{ borderColor: pastel.accent, color: pastel.text, border: '2px solid' }}
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ——— Helpers ——— */

function ShareButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:shadow-md"
      style={{ backgroundColor: 'rgba(232,180,168,0.15)', color: pastel.text }}
      aria-label={`Share on ${label}`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
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
