import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const isPreview = process.env.VERCEL_ENV === 'preview';

  // Noindex preview deployments so they don't compete with production
  if (isPreview && !url.pathname.startsWith('/api')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.webp|.*\\.jpg|.*\\.png).*)'],
};
