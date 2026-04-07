import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';
import { SITE_URL } from '@/lib/site';
import { createBreadcrumbSchema, coachingServiceSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Coaching Services | 1:1 Sessions & Workshops Toronto',
  description:
    'Faith-aligned coaching services for Muslim women entrepreneurs. 1:1 coaching sessions ($160 CAD), group workshops, and 6-week transformation programs. Online and in-person options available in Toronto.',
  keywords: [
    'life coaching services',
    '1:1 coaching Toronto',
    'group coaching workshops',
    'Muslim women coaching',
    'faith-aligned programs',
    'mindset coaching packages',
    'business coach services',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: `${SITE_URL}/services`,
    title: 'Coaching Services | Hirah Safi Coaching',
    description: 'Faith-aligned coaching services for Muslim women entrepreneurs. 1:1 sessions, workshops, and transformation programs.',
    siteName: 'Hirah Safi Coaching',
    images: [
      {
        url: `${SITE_URL}/og-services.jpg`,
        width: 1200,
        height: 630,
        alt: 'Hirah Safi Coaching Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coaching Services | Hirah Safi',
    description: 'Faith-aligned coaching for Muslim women entrepreneurs.',
    creator: '@hirahsafi',
  },
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

const breadcrumbs = createBreadcrumbSchema([
  { name: 'Home', url: SITE_URL },
  { name: 'Services', url: `${SITE_URL}/services` },
]);

const serviceSchema = {
  ...coachingServiceSchema,
  "url": `${SITE_URL}/services`,
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicesPageClient />
    </>
  );
}
