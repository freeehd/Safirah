import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirahsafi.com';

export const metadata: Metadata = {
  title: 'Bloom & Belong – A Flower Circle Afternoon',
  description:
    'An afternoon for women tired of doing it alone. Build bouquets for one another in a real circle — mindset work disguised as making something beautiful. $25 · Toronto · August 27.',
  openGraph: {
    title: 'Bloom & Belong – A Flower Circle Afternoon | Hirah Safi Coaching',
    description:
      'Real flowers in your hands. Real women around you. An afternoon that loosens the mindset keeping you small.',
    url: `${SITE_URL}/events/bloom-and-belong`,
    siteName: 'Hirah Safi Coaching',
    images: [{ url: `${SITE_URL}/assets/bloom-event-2.jpeg`, width: 1200, height: 630 }],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloom & Belong – A Flower Circle Afternoon',
    description: 'Build bouquets for one another in a real circle. $25 · Toronto · August 27.',
    creator: '@hirahsafi',
  },
  alternates: { canonical: `${SITE_URL}/events/bloom-and-belong` },
};

export default function BloomBelongLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
