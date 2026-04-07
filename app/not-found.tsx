import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page Not Found | Hirah Safi Coaching',
  description: 'The page you requested could not be found. Return to the homepage to explore faith-aligned coaching services.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f4f1]">
      <div className="text-center max-w-md mx-auto px-6 py-12">
        <h1 className="text-6xl font-playfair text-[#57534E] mb-4">404</h1>
        <h2 className="text-2xl font-playfair text-[#57534E] mb-4">Page Not Found</h2>
        <p className="text-lg text-[#57534E]/80 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-block bg-[#FFB5A7] hover:bg-[#e8a498] text-white font-medium px-6 py-3 rounded-full transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}