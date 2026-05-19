import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirahsafi.com';

export const metadata: Metadata = {
  title: 'The Golden Pearl – A Sisterhood Sanctuary',
  description:
    'Join Hirah Safi for an intimate evening of faith, strategy, and sisterhood in Toronto. Free admission — snacks, giveaways, and family welcome.',
  openGraph: {
    title: 'The Golden Pearl – A Sisterhood Sanctuary',
    description:
      'Join Hirah Safi for an intimate evening of faith, strategy, and sisterhood in Toronto. Free admission — snacks, giveaways, and family welcome.',
    url: `${SITE_URL}/events/golden-pearl`,
    siteName: 'Hirah Safi Coaching',
    images: [{ url: `${SITE_URL}/og-golden-pearl.jpg`, width: 1200, height: 630 }],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Golden Pearl – A Sisterhood Sanctuary',
    description: 'Free admission event in Toronto with Hirah Safi.',
  },
  alternates: { canonical: `${SITE_URL}/events/golden-pearl` },
};

export default function GoldenPearlLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
