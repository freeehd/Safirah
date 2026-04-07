import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';
import { SITE_URL } from '@/lib/site';
import { createBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Blog | Faith-Aligned Coaching Tips for Muslim Women',
  description:
    'Expert insights on mindset, business strategy, and faith-aligned success. Articles by Hirah Safi on NLP, entrepreneurship, spiritual growth, and building a purpose-driven business.',
  keywords: [
    'Muslim women business tips',
    'faith-aligned entrepreneurship',
    'mindset coaching blog',
    'Islamic business advice',
    'women entrepreneur tips',
    'spiritual business growth',
    'NLP coaching insights',
    'Toronto business coach blog',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: `${SITE_URL}/blog`,
    title: 'Blog | Hirah Safi Coaching',
    description: 'Expert insights on mindset, business strategy, and faith-aligned success for Muslim women entrepreneurs.',
    siteName: 'Hirah Safi Coaching',
    images: [
      {
        url: `${SITE_URL}/api/og?page=blog&title=Blog`,
        width: 1200,
        height: 630,
        alt: 'Hirah Safi Coaching Blog - Faith-aligned business tips',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Hirah Safi Coaching',
    description: 'Expert insights on mindset and faith-aligned business success.',
    creator: '@hirahsafi',
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

const breadcrumbs = createBreadcrumbSchema([
  { name: 'Home', url: SITE_URL },
  { name: 'Blog', url: `${SITE_URL}/blog` },
]);

// Sample blog posts - replace with actual content
const samplePosts = [
  {
    slug: 'overcoming-imposter-syndrome-faith-aligned-approach',
    title: 'Overcoming Imposter Syndrome: A Faith-Aligned Approach',
    excerpt: 'Learn how to silence your inner critic and step into your power using Islamic principles and NLP techniques.',
    date: '2026-04-01',
    readTime: '8 min read',
    category: 'Mindset',
    image: '/assets/blog/imposter-syndrome.jpg',
  },
  {
    slug: 'building-business-with-barakah',
    title: 'Building a Business with Barakah: 7 Essential Principles',
    excerpt: 'Discover how to align your business goals with your faith and create sustainable, blessed success.',
    date: '2026-03-25',
    readTime: '10 min read',
    category: 'Business',
    image: '/assets/blog/barakah-business.jpg',
  },
  {
    slug: 'pricing-with-confidence-muslim-women',
    title: 'Pricing with Confidence: A Guide for Muslim Women Entrepreneurs',
    excerpt: 'Stop undervaluing your services. Learn to price with peace and attract your ideal clients.',
    date: '2026-03-18',
    readTime: '7 min read',
    category: 'Business',
    image: '/assets/blog/pricing-confidence.jpg',
  },
  {
    slug: 'morning-routine-success-muslim-women',
    title: 'The Morning Routine That Changed My Business (and My Deen)',
    excerpt: 'A faith-first morning routine that sets you up for productivity, peace, and purpose.',
    date: '2026-03-10',
    readTime: '6 min read',
    category: 'Lifestyle',
    image: '/assets/blog/morning-routine.jpg',
  },
  {
    slug: 'setting-boundaries-without-guilt',
    title: 'Setting Boundaries Without Guilt: An Islamic Perspective',
    excerpt: 'Learn why boundaries are not selfish—they are essential for your well-being and your business.',
    date: '2026-03-05',
    readTime: '9 min read',
    category: 'Mindset',
    image: '/assets/blog/boundaries.jpg',
  },
  {
    slug: 'scaling-with-soul-grow-without-burnout',
    title: 'Scaling with Soul: How to Grow Without Burning Out',
    excerpt: 'Sustainable growth strategies that honor your energy, your values, and your vision.',
    date: '2026-02-28',
    readTime: '11 min read',
    category: 'Business',
    image: '/assets/blog/scaling-soul.jpg',
  },
];

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <BlogPageClient posts={samplePosts} />
    </>
  );
}
