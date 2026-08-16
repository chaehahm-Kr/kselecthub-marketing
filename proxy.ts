import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Exclude static assets, public files, and APIs
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Redirect `/en` or `/en/*` to `/` or `/*` (Permanent Redirect)
  if (pathname === '/en') {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }
  if (pathname.startsWith('/en/')) {
    const newPath = pathname.substring(3); // remove '/en'
    return NextResponse.redirect(new URL(newPath + request.nextUrl.search, request.url), 301);
  }

  // 3. If it doesn't start with `/ko` and is not `/en`, rewrite internally to `/en` + path
  if (!pathname.startsWith('/ko')) {
    return NextResponse.rewrite(new URL(`/en${pathname}${request.nextUrl.search}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files or api routes
    '/((?!api|_next/static|_next/image|favicon.ico|images|favicon).*)',
  ],
};
