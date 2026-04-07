import type { Metadata } from 'next';
import EventsPageClient from './EventsPageClient';
import { SITE_URL } from '@/lib/site';
import { createBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Workshops & Events | Faith-Aligned Coaching Toronto',
  description:
    'Join our faith-aligned workshops and events for Muslim women entrepreneurs. Online and in-person workshops in Toronto covering mindset, business strategy, and spiritual alignment.',
  keywords: [
    'coaching workshops Toronto',
    'women entrepreneur events',
    'faith-aligned workshops',
    'mindset workshops',
    'Muslim women events',
    'business coaching events',
    'Toronto coaching events',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: `${SITE_URL}/events`,
    title: 'Workshops & Events | Hirah Safi Coaching',
    description: 'Join our faith-aligned workshops and events for Muslim women entrepreneurs. Online and in-person options available.',
    siteName: 'Hirah Safi Coaching',
    images: [
      {
        url: `${SITE_URL}/assets/golden-pearl.webp`,
        width: 1200,
        height: 630,
        alt: 'Hirah Safi Coaching Workshops - Faith-aligned women entrepreneur events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workshops & Events | Hirah Safi',
    description: 'Faith-aligned workshops for Muslim women entrepreneurs.',
    creator: '@hirahsafi',
  },
  alternates: {
    canonical: `${SITE_URL}/events`,
  },
};

const breadcrumbs = createBreadcrumbSchema([
  { name: 'Home', url: SITE_URL },
  { name: 'Events', url: `${SITE_URL}/events` },
]);

export default function EventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <EventsPageClient />
    </>
  );
}