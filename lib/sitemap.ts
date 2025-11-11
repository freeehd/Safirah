import path from 'path';
import { promises as fs } from 'fs';
import type { MetadataRoute } from 'next';
import { SITE_URL, STATIC_ROUTES } from '@/lib/site';

async function exists(p: string) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

async function listSubdirs(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries.filter(e => e.isDirectory()).map(e => e.name);
  } catch {
    return [];
  }
}

async function fsPathsForAppSegment(segment: string, prefix: string): Promise<string[]> {
  const base = path.join(process.cwd(), 'app', segment);
  const dirs = await listSubdirs(base);
  const candidates: string[] = [];

  await Promise.all(
    dirs.map(async (d) => {
      if (d.startsWith('(') || d.startsWith('_')) return; // ignore route groups/system
      const pageTsx = path.join(base, d, 'page.tsx');
      const pageTs = path.join(base, d, 'page.ts');
      const hasPage = (await exists(pageTsx)) || (await exists(pageTs));
      if (hasPage) {
        candidates.push(`${prefix}/${d}`);
      }
    })
  );

  return candidates;
}

async function fetchExternalPaths(): Promise<string[]> {
  const url = process.env.SITEMAP_SOURCE_URL;
  if (!url) return [];
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    const arr = Array.isArray(data) ? data : Array.isArray(data?.paths) ? data.paths : [];
    return arr.filter((p: unknown) => typeof p === 'string') as string[];
  } catch {
    return [];
  }
}

export async function getAllRoutePaths(): Promise<string[]> {
  const [events, services, blog, external] = await Promise.all([
    fsPathsForAppSegment('events', '/events'),
    fsPathsForAppSegment('services', '/services'),
    fsPathsForAppSegment('blog', '/blog'),
    fetchExternalPaths(),
  ]);

  const all = [...STATIC_ROUTES, ...events, ...services, ...blog, ...external];
  const set = new Set<string>();
  for (const p of all) {
    if (!p || typeof p !== 'string') continue;
    const norm = p.startsWith('http') ? p : p.startsWith('/') ? p : `/${p}`;
    set.add(norm.replace(/\/$/, ''));
  }
  return Array.from(set);
}

export async function getSitemapXmlEntries(): Promise<MetadataRoute.Sitemap> {
  const paths = await getAllRoutePaths();
  const now = new Date();
  return paths.map<MetadataRoute.Sitemap[number]>((p) => ({
    url: p.startsWith('http') ? p : `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: p === '/' ? 'daily' : 'weekly',
    priority: p === '/' ? 1 : 0.7,
  }));
}
