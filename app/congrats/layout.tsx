import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirahsafi.com';

export const metadata: Metadata = {
  title: 'Congratulations – Welcome Aboard',
  description: 'Thank you for taking this step. You\'re now on the list for exclusive updates from Hirah Safi Coaching.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/congrats` },
};

export default function CongratsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
