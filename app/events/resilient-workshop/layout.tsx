import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirahsafi.com';

export const metadata: Metadata = {
  title: 'The Resilient Workshop – Faith & Strategy',
  description:
    'A transformative workshop with Hirah Safi — build resilience through faith-aligned strategies, sisterhood, and actionable breakthroughs.',
  openGraph: {
    title: 'The Resilient Workshop – Faith & Strategy',
    description:
      'A transformative workshop with Hirah Safi — build resilience through faith-aligned strategies, sisterhood, and actionable breakthroughs.',
    url: `${SITE_URL}/events/resilient-workshop`,
    siteName: 'Hirah Safi Coaching',
    images: [{ url: `${SITE_URL}/og-resilient.jpg`, width: 1200, height: 630 }],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Resilient Workshop',
    description: 'Build resilience through faith-aligned strategies.',
  },
  alternates: { canonical: `${SITE_URL}/events/resilient-workshop` },
};

export default function ResilientLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
