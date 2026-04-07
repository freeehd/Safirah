export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hirahsaficoach.com').replace(/\/$/, '');

export const DEFAULT_SEO = {
  title: 'Hirah Safi Coaching | Faith-Aligned Life & Success Coach Toronto',
  description:
    'Faith-aligned life coaching, workshops and resources for Muslim women entrepreneurs. Build inner strength, clarity, and self-trust with Hirah Safi. 1:1 coaching, group workshops, and online programs.',
  keywords: [
    'life coach Toronto',
    'Muslim life coach',
    'faith-aligned coaching',
    'success coach',
    'women entrepreneur coach',
    'NLP coach Canada',
    'mindset coach',
    'Islamic life coach',
    'business coach for women',
    'Toronto coaching services',
  ],
  twitter: {
    site: '@hirahsafi',
    creator: '@hirahsafi',
  },
};

export const STATIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/events',
  '/events/soulmate-workshop',
  '/events/resilient-workshop',
  '/events/golden-pearl',
  '/contact',
  '/quiz',
  '/congrats',
];

