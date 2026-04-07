import { MetadataRoute } from 'next';
import { getSitemapXmlEntries } from '@/lib/sitemap';

/**
 * Dynamic sitemap for Next.js App Router
 * Returns XML format for search engines
 * Generated at build time and cached
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return await getSitemapXmlEntries();
}
