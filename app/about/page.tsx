import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';
import { SITE_URL } from '@/lib/site';
import { createBreadcrumbSchema, personSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About Hirah Safi | Faith-Aligned Life Coach Toronto',
  description:
    'Meet Hirah Safi — faith-aligned life and success coach helping Muslim women entrepreneurs overcome mindset blocks, build confidence, and create purpose-driven businesses. 8+ years of experience with NLP and mindset re-patterning.',
  keywords: [
    'about Hirah Safi',
    'life coach bio',
    'Muslim coach Toronto',
    'faith-aligned coach',
    'NLP practitioner Canada',
    'women entrepreneur coach',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: `${SITE_URL}/about`,
    title: 'About Hirah Safi | Faith-Aligned Life Coach',
    description: 'Meet Hirah Safi — faith-aligned life coach helping Muslim women entrepreneurs build confidence and create purpose-driven businesses.',
    siteName: 'Hirah Safi Coaching',
    images: [
      {
        url: `${SITE_URL}/assets/5.webp`,
        width: 1200,
        height: 630,
        alt: 'Hirah Safi - Life and Success Coach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Hirah Safi | Faith-Aligned Life Coach',
    description: 'Meet Hirah Safi — faith-aligned life coach for Muslim women entrepreneurs.',
    creator: '@hirahsafi',
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const breadcrumbs = createBreadcrumbSchema([
  { name: 'Home', url: SITE_URL },
  { name: 'About', url: `${SITE_URL}/about` },
]);

const enhancedPersonSchema = {
  ...personSchema,
  "url": `${SITE_URL}/about`,
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(enhancedPersonSchema) }}
      />
      <AboutPageClient />
    </>
  );
}
