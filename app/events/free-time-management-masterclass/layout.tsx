import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hirahsafi.com';

export const metadata: Metadata = {
  title: 'Free Time-Management Masterclass | Hirah Safi Coaching',
  description:
    'Join Hirah Safi for a free 75-minute masterclass on faith-aligned time management. Learn to reclaim your days, set guilt-free boundaries, and build a routine that protects your peace.',
  openGraph: {
    title: 'Free Time-Management Masterclass for Ambitious Muslim Women',
    description:
      'Stop starting over every Monday. A free 75-minute masterclass on faith-aligned time management, boundaries, and burnout-free productivity.',
    url: `${SITE_URL}/events/free-time-management-masterclass`,
    siteName: 'Hirah Safi Coaching',
    images: [
      {
        url: `${SITE_URL}/assets/hirah-smile-shrug.jpeg`,
        width: 1200,
        height: 1600,
        alt: 'Free Time-Management Masterclass with Hirah Safi',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Time-Management Masterclass',
    description:
      'A free 75-minute masterclass for busy Muslim women ready to reclaim their time, set boundaries, and build a faith-aligned routine.',
    images: [`${SITE_URL}/assets/hirah-smile-shrug.jpeg`],
  },
  alternates: {
    canonical: `${SITE_URL}/events/free-time-management-masterclass`,
  },
};

export default function FreeTimeManagementLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
