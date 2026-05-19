import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirahsafi.com';

export const metadata: Metadata = {
  title: 'Lifestyle Quiz – Discover Your Alignment',
  description:
    'Take the free Lifestyle Quiz from Hirah Safi Coaching. Discover where you are in your faith-aligned journey and what your next step could be.',
  openGraph: {
    title: 'Lifestyle Quiz – Discover Your Alignment',
    description: 'Take the free quiz and discover your next step.',
    url: `${SITE_URL}/quiz`,
    siteName: 'Hirah Safi Coaching',
    images: [{ url: `${SITE_URL}/og-quiz.jpg`, width: 1200, height: 630 }],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lifestyle Quiz',
    description: 'Discover where you are in your faith-aligned journey.',
  },
  alternates: { canonical: `${SITE_URL}/quiz` },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
