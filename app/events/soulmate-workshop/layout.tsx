import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirahsafi.com';

export const metadata: Metadata = {
  title: 'The Soulmate Workshop – Faith-Aligned Love',
  description:
    'A sacred workshop with Hirah Safi on navigating marriage, self-worth, and attracting a faith-aligned partner through Islamic principles.',
  openGraph: {
    title: 'The Soulmate Workshop – Faith-Aligned Love',
    description:
      'A sacred workshop with Hirah Safi on navigating marriage, self-worth, and attracting a faith-aligned partner through Islamic principles.',
    url: `${SITE_URL}/events/soulmate-workshop`,
    siteName: 'Hirah Safi Coaching',
    images: [{ url: `${SITE_URL}/og-soulmate.jpg`, width: 1200, height: 630 }],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Soulmate Workshop',
    description: 'Navigate marriage and attract a faith-aligned partner.',
  },
  alternates: { canonical: `${SITE_URL}/events/soulmate-workshop` },
};

export default function SoulmateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
