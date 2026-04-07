/**
 * Structured Data (JSON-LD) Schemas for SEO
 * https://schema.org/
 * 
 * These schemas help search engines understand your content
 * and enable rich snippets in search results.
 */

import { SITE_URL } from './site';

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hirah Safi Coaching",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "description": "Faith-aligned life coaching, workshops and resources for Muslim women entrepreneurs to build inner strength, clarity, and self-trust.",
  "founder": {
    "@type": "Person",
    "name": "Hirah Safi"
  },
  "areaServed": ["Toronto", "Ontario", "Canada", "Online"],
  "sameAs": [
    "https://instagram.com/hirahsafi",
    "https://linkedin.com/in/hirahsafi",
    "https://www.facebook.com/hirahsafi"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hirahsafi@gmail.com",
    "contactType": "customer service"
  }
};

// Person Schema (for Hirah)
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Hirah Safi",
  "jobTitle": "Life & Success Coach",
  "url": SITE_URL,
  "image": `${SITE_URL}/assets/1.webp`,
  "description": "Hirah Safi is a faith-aligned life and success coach helping Muslim women entrepreneurs overcome mindset blocks, build confidence, and create purpose-driven businesses.",
  "sameAs": [
    "https://instagram.com/hirahsafi",
    "https://linkedin.com/in/hirahsafi",
    "https://www.facebook.com/hirahsafi"
  ],
  "knowsAbout": [
    "Life Coaching",
    "NLP (Neuro-Linguistic Programming)",
    "Mindset Coaching",
    "Business Strategy",
    "Faith-Aligned Coaching",
    "Women's Empowerment"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Hirah Safi Coaching"
  }
};

// LocalBusiness Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Hirah Safi Coaching",
  "image": `${SITE_URL}/assets/1.webp`,
  "url": SITE_URL,
  "telephone": "+1-XXX-XXX-XXXX",
  "email": "hirahsafi@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toronto",
    "addressRegion": "Ontario",
    "addressCountry": "Canada"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "43.6532",
    "longitude": "-79.3832"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "$$",
  "description": "Faith-aligned life coaching for Muslim women entrepreneurs in Toronto and online."
};

// Service Schema (for coaching packages)
export const coachingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Life Coaching",
  "provider": {
    "@type": "Person",
    "name": "Hirah Safi"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Canada"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": SITE_URL,
    "availableLanguage": "English"
  },
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "priceCurrency": "CAD",
    "price": "160.00",
    "availability": "https://schema.org/InStock"
  },
  "description": "1:1 life coaching sessions for Muslim women entrepreneurs. Faith-aligned mindset coaching with NLP techniques."
};

// Event Schema Template
export function createEventSchema(event: {
  name: string;
  description: string;
  startDate: string; // ISO 8601 format
  endDate: string;
  location: {
    name: string;
    address?: string;
    url?: string;
  };
  image: string;
  offers?: {
    price: string;
    currency: string;
    url: string;
    availability: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "location": event.location.url 
      ? {
          "@type": "VirtualLocation",
          "url": event.location.url
        }
      : {
          "@type": "Place",
          "name": event.location.name,
          "address": event.location.address
        },
    "image": event.image,
    "organizer": {
      "@type": "Person",
      "name": "Hirah Safi",
      "url": SITE_URL
    },
    "offers": event.offers ? {
      "@type": "Offer",
      "price": event.offers.price,
      "priceCurrency": event.offers.currency,
      "url": event.offers.url,
      "availability": event.offers.availability
    } : undefined
  };
}

// FAQ Schema Template
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Breadcrumb Schema Template
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Article/BlogPost Schema Template
export function createArticleSchema(article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "image": article.image,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hirah Safi Coaching",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "url": article.url
  };
}

// Review/Testimonial Schema Template
export function createReviewSchema(review: {
  reviewer: string;
  rating: number; // 1-5
  reviewBody: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString(),
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": review.reviewer
    },
    "reviewBody": review.reviewBody,
    "datePublished": review.datePublished
  };
}

// AggregateRating Schema (for overall business rating)
export const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Hirah Safi Coaching",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50+",
    "bestRating": "5",
    "worstRating": "1"
  }
};

/**
 * Helper to render JSON-LD script tag
 * Usage: <Script id="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */
export function renderJsonLd(schema: object): string {
  return JSON.stringify(schema, null, 2);
}
