import type { Metadata } from 'next';
import WorkshopsPageClient from './WorkshopsPageClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirahsafi.com';

export const metadata: Metadata = {
  title: 'Deep-Dive Workshops | Hirah Safi',
  description:
    'Faith-aligned workshops for Muslim women entrepreneurs — book-opening interactive experiences, clarity intensives, and community gatherings with barakah.',
  openGraph: {
    title: 'Workshops | Hirah Safi',
    description: 'Faith-aligned workshops for Muslim women entrepreneurs.',
    url: `${SITE_URL}/events/workshops`,
    images: [{ url: '/assets/og-workshops.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workshops | Hirah Safi',
    description: 'Faith-aligned workshops for Muslim women entrepreneurs.',
    creator: '@hirahsafi',
  },
  alternates: {
    canonical: `${SITE_URL}/events/workshops`,
  },
};

export default function WorkshopsPage() {
  return <WorkshopsPageClient />
}
