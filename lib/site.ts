export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hirahsaficoach.com').replace(/\/$/, '');

export const DEFAULT_SEO = {
  title: 'Hirah Safi Coaching',
  description:
    'Faith-aligned coaching, workshops and resources to build inner strength, clarity and self-trust.',
  keywords: ['coaching', 'faith-aligned', 'workshop', 'self-growth', 'Toronto', 'online'],
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
  '/contact',
  '/congrats',
];

