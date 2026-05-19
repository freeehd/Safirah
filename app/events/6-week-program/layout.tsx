import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirahsafi.com';

export const metadata: Metadata = {
  title: 'The Becoming – A 6-Week Reset',
  description:
    'A guided 6-week program for Muslim women ready to shed what no longer serves them. Faith-aligned coaching, live sessions, workbook, and community.',
  openGraph: {
    title: 'The Becoming – A 6-Week Reset',
    description:
      'A guided 6-week program for Muslim women ready to shed what no longer serves them. Faith-aligned coaching, live sessions, workbook, and community.',
    url: `${SITE_URL}/events/6-week-program`,
    siteName: 'Hirah Safi Coaching',
    images: [
      {
        url: `${SITE_URL}/og-becoming.jpg`,
        width: 1200,
        height: 630,
        alt: 'The Becoming – A 6-Week Reset for the Woman You\'ve Been Praying to Be',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Becoming – A 6-Week Reset',
    description:
      'A guided 6-week program for Muslim women ready to shed what no longer serves them.',
  },
  alternates: {
    canonical: `${SITE_URL}/events/6-week-program`,
  },
};

export default function SixWeekProgramLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
