// Create a file called middleware.ts in your project root
// This will intercept all routes and redirect to the waitlist page

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow access to the waitlist page itself and any assets
  if (
    request.nextUrl.pathname === '/waitlist' ||
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.includes('.') // For static files
  ) {
    return NextResponse.next();
  }
  
  // Redirect all other routes to the waitlist page
  return NextResponse.redirect(new URL('/waitlist', request.url));
}

// You can optionally set a matcher to specify which routes to run middleware on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};