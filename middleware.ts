import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ko'];
const defaultLocale = 'ko';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("--- MIDDLEWARE TRIGGERED FOR PATH:", pathname);

  // Exclude internal paths or public static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') || 
    pathname === '/favicon.ico'
  ) {
    return;
  }

  // Check if pathname has a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to /[locale] (defaulting to ko for Phase 1)
  const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  console.log("--- REDIRECTING TO:", redirectUrl.toString());
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    // Standard Next.js middleware bypass matcher
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
