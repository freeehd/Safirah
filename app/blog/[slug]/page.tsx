import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/site';
import { createBreadcrumbSchema, createArticleSchema } from '@/lib/schema';
import BlogPostClient from './BlogPostClient';

// Sample posts - replace with actual CMS/database
const posts = {
  'overcoming-imposter-syndrome-faith-aligned-approach': {
    title: 'Overcoming Imposter Syndrome: A Faith-Aligned Approach',
    description: 'Learn how to silence your inner critic and step into your power using Islamic principles and NLP techniques.',
    date: '2026-04-01',
    author: 'Hirah Safi',
    category: 'Mindset',
    readTime: '8 min read',
    image: '/assets/blog/imposter-syndrome.jpg',
  },
  'building-business-with-barakah': {
    title: 'Building a Business with Barakah: 7 Essential Principles',
    description: 'Discover how to align your business goals with your faith and create sustainable, blessed success.',
    date: '2026-03-25',
    author: 'Hirah Safi',
    category: 'Business',
    readTime: '10 min read',
    image: '/assets/blog/barakah-business.jpg',
  },
  'pricing-with-confidence-muslim-women': {
    title: 'Pricing with Confidence: A Guide for Muslim Women Entrepreneurs',
    description: 'Stop undervaluing your services. Learn to price with peace and attract your ideal clients.',
    date: '2026-03-18',
    author: 'Hirah Safi',
    category: 'Business',
    readTime: '7 min read',
    image: '/assets/blog/pricing-confidence.jpg',
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    return {
      title: 'Post Not Found',
      robots: { index: false },
    };
  }

  return {
    title: `${post.title} | Hirah Safi Coaching`,
    description: post.description,
    keywords: [
      post.category.toLowerCase(),
      'Muslim women entrepreneur',
      'faith-aligned coaching',
      'Hirah Safi',
    ],
    openGraph: {
      type: 'article',
      locale: 'en_CA',
      url: `${SITE_URL}/blog/${slug}`,
      title: post.title,
      description: post.description,
      siteName: 'Hirah Safi Coaching',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image.startsWith('/') ? `${SITE_URL}${post.image}` : post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@hirahsafi',
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  const breadcrumbs = createBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${slug}` },
  ]);

  const articleSchema = createArticleSchema({
    headline: post.title,
    description: post.description,
    image: post.image.startsWith('/') ? `${SITE_URL}${post.image}` : post.image,
    datePublished: post.date,
    author: post.author,
    url: `${SITE_URL}/blog/${slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostClient post={post} slug={slug} />
    </>
  );
}
