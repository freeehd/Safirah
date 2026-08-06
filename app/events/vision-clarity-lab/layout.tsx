import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirahsafi.com';

export const metadata: Metadata = {
  title: 'Vision & Clarity Lab – Free Live Workshop',
  description:
    'A free 90-minute live workshop with Hirah Safi to map your goals, your values, and your next step — without the overwhelm. Sisters only, live online.',
  openGraph: {
    title: 'Vision & Clarity Lab | Hirah Safi Coaching',
    description:
      'A gentle, guided deep-dive to map your goals, your values, and your next step — without the overwhelm.',
    url: `${SITE_URL}/events/vision-clarity-lab`,
    siteName: 'Hirah Safi Coaching',
    images: [{ url: `${SITE_URL}/assets/hirah-notebook.jpeg`, width: 1200, height: 630 }],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision & Clarity Lab | Hirah Safi',
    description: 'A free 90-minute live workshop — map your goals, values, and next step.',
    creator: '@hirahsafi',
  },
  alternates: { canonical: `${SITE_URL}/events/vision-clarity-lab` },
};

export default function VisionClarityLabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
