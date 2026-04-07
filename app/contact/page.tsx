import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import { SITE_URL } from '@/lib/site';
import { createBreadcrumbSchema, localBusinessSchema, createFAQSchema } from '@/lib/schema';

const faqs = [
  {
    question: 'How do I schedule my 1:1 coaching session?',
    answer: 'After purchasing a session through our shop, you\'ll receive an email with a link to my calendar. You can book any available slot that works for you. Sessions are conducted via video call.'
  },
  {
    question: 'What if I need to reschedule my session?',
    answer: 'Life happens! You can reschedule up to 24 hours before your session using the link in your confirmation email. Sessions are non-refundable but can be rescheduled.'
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'Sessions can be rescheduled up to 24 hours before the scheduled time. Cancellations within 24 hours are subject to the full session fee. If you\'re unsure, feel free to reach out via email first.'
  },
  {
    question: 'Do you offer package discounts for multiple sessions?',
    answer: 'Yes! I offer discounted packages for 3, 6, and 12 session bundles. Contact me at hirahsafi@gmail.com to discuss custom packages that fit your needs and budget.'
  },
  {
    question: 'What coaching methods do you use?',
    answer: 'I use a faith-aligned approach combining NLP (Neuro-Linguistic Programming), mindset re-patterning, gentle accountability, and Islamic principles. Each session is tailored to your specific challenges and goals.'
  },
];

export const metadata: Metadata = {
  title: 'Contact Hirah Safi | Book Coaching Session Toronto',
  description:
    'Get in touch with Hirah Safi for faith-aligned life coaching. Book a 1:1 consultation ($160 CAD), ask about workshops, or inquire about coaching packages. Serving Toronto and online worldwide.',
  keywords: [
    'contact life coach',
    'book coaching session',
    'Toronto coach contact',
    'coaching consultation',
    'faith-aligned coach contact',
    'book Hirah Safi',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: `${SITE_URL}/contact`,
    title: 'Contact Hirah Safi | Book Coaching Session',
    description: 'Get in touch with Hirah Safi for faith-aligned life coaching. Book a 1:1 consultation or ask about workshops.',
    siteName: 'Hirah Safi Coaching',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Hirah Safi | Book Coaching',
    description: 'Get in touch for faith-aligned life coaching.',
    creator: '@hirahsafi',
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

const breadcrumbs = createBreadcrumbSchema([
  { name: 'Home', url: SITE_URL },
  { name: 'Contact', url: `${SITE_URL}/contact` },
]);

const contactSchema = {
  ...localBusinessSchema,
  "url": `${SITE_URL}/contact`,
};

const faqSchema = createFAQSchema(faqs);

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactPageClient />
    </>
  );
}
