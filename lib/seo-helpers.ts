/**
 * Additional SEO helpers for enhanced search indexing
 */

import { SITE_URL } from './site';

/**
 * Generate Open Graph image URL
 * Use this for dynamic OG image generation
 */
export function getOGImageURL(page: string, title?: string) {
  // For now, returning a placeholder that you can replace with dynamic image generation
  return `${SITE_URL}/api/og?page=${encodeURIComponent(page)}${title ? `&title=${encodeURIComponent(title)}` : ''}`;
}

/**
 * Get page-specific keywords for SEO
 */
export function getPageKeywords(page: string, keywords: string[] = []): string[] {
  const baseKeywords = [
    'Hirah Safi Coaching',
    'faith-aligned coaching',
    'Muslim women coach',
    'Toronto life coach',
  ];
  
  return [...baseKeywords, ...keywords];
}

/**
 * Create structured data context
 * Helps Google understand your site structure
 */
export function getSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: 'Hirah Safi Coaching',
    description: 'Faith-aligned life coaching for Muslim women entrepreneurs',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate breadcrumb structured data for any page
 */
export function generateBreadcrumbData(
  pages: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pages.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.name,
      item: page.url,
    })),
  };
}

/**
 * Encode title for URL-friendly use
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Check if a URL is valid
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get social media sharing URLs
 */
export function getSocialShareURLs(pageUrl: string, title: string, description: string) {
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDesc}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle} - ${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDesc} - ${encodedUrl}`,
  };
}

/**
 * Generate news article schema (for blog posts)
 */
export function createNewsArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: headline,
    description: description,
    image: [image],
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hirah Safi Coaching',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

/**
 * Generate local business schema
 */
export function createLocalBusinessSchema({
  name,
  address,
  phone,
  email,
  url,
  openHours,
  rating,
}: {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  url: string;
  openHours?: string[];
  rating?: number;
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressRegion: 'Ontario',
      addressCountry: 'Canada',
    },
    url: url,
  };

  if (address) schema.address.addressStreetAddress = address;
  if (phone) schema.telephone = phone;
  if (email) schema.email = email;
  if (openHours) schema.openingHours = openHours;
  if (rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: '50+',
    };
  }

  return schema;
}
