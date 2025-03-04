import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Don't redirect if already on the waitlist page or accessing static assets
  if (
    pathname.startsWith('/waitlist') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.') // Static files like images, css, js, etc.
  ) {
    return NextResponse.next();
  }
  
  // Redirect to waitlist page
  const url = request.nextUrl.clone();
  url.pathname = '/waitlist';
  
  return NextResponse.redirect(url);
}

// Match all routes except for specific ones
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. All static files (e.g. favicon.ico, robots.txt)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};