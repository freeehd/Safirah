import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { SITE_URL, DEFAULT_SEO } from '@/lib/site';
import { createBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Faith-Aligned Life & Success Coach Toronto | Hirah Safi Coaching',
  description:
    'Transform your mindset and build a purpose-driven business with faith-aligned coaching. 1:1 sessions, workshops, and programs for Muslim women entrepreneurs in Toronto and online.',
  keywords: [
    'life coach Toronto',
    'Muslim life coach',
    'faith-aligned coaching',
    'success coach for women',
    'mindset coach Canada',
    'Islamic business coach',
    'NLP coach Toronto',
    'women entrepreneur coaching',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: SITE_URL,
    title: 'Hirah Safi Coaching | Faith-Aligned Life & Success Coach',
    description: 'Transform your mindset and build a purpose-driven business with faith-aligned coaching for Muslim women entrepreneurs.',
    siteName: 'Hirah Safi Coaching',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Hirah Safi Coaching - Faith-Aligned Life Coach Toronto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hirah Safi Coaching | Faith-Aligned Life Coach',
    description: 'Transform your mindset and build a purpose-driven business with faith-aligned coaching.',
    creator: '@hirahsafi',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const breadcrumbs = createBreadcrumbSchema([
  { name: 'Home', url: SITE_URL },
]);

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <HomePageClient />
    </>
  );
}
