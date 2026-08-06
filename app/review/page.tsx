import type { Metadata } from 'next';
import ReviewPageClient from './ReviewPageClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirahsafi.com';

export const metadata: Metadata = {
  title: 'Share Your Review | Hirah Safi Coaching',
  description:
    'Leave a review for the Bloom & Belong experience or any Hirah Safi coaching session. Your words help more sisters find their way to the circle.',
  openGraph: {
    title: 'Share Your Review | Hirah Safi Coaching',
    description: 'Leave a review for Bloom & Belong or a Hirah Safi coaching session.',
    url: `${SITE_URL}/review`,
    siteName: 'Hirah Safi Coaching',
    locale: 'en_CA',
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/review` },
};

export default function ReviewPage() {
  return <ReviewPageClient />;
}
