import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site';
import { getAllRoutePaths } from '@/lib/sitemap';

export async function GET() {
  const paths = await getAllRoutePaths();
  const urls = paths.map((p) => (p.startsWith('http') ? p : `${SITE_URL}${p}`)).join('\n');
  return new NextResponse(urls + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Cache for 12 hours; revalidate on new build
      'Cache-Control': 'public, max-age=43200, s-maxage=43200, stale-while-revalidate=86400',
    },
  });
}
