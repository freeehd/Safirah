import type { MetadataRoute } from 'next';
import { getSitemapXmlEntries } from '@/lib/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getSitemapXmlEntries();
}
