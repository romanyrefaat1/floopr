import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the authentication token from cookies
  const token = request.cookies.get('authToken')?.value;
  
  // Verify the token server-side
  const isUserSignedIn = true
  
  const protectedRoutes = [
    '/home',
    '/new-product',
    '/new'
  ];
  
  const protectedFromAuthorizedRoutes = [
    '/signin',
    '/signup'
  ];

  // Skip processing for specific routes and file types
  const ignoredPaths = [
    '/_next',
    '/api',
    '/waitlist',
    '/_static',
    '/_vercel'
  ];

  const shouldIgnorePath = ignoredPaths.some(path => 
    pathname.startsWith(path) || pathname.includes('.')
  );

  if (shouldIgnorePath) {
    return NextResponse.next();
  }

  // Protect routes from unauthenticated users
  if (!isUserSignedIn) {
    if (protectedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  // Redirect if user is signed in and tries to access auth routes
  if (isUserSignedIn) {
    if (protectedFromAuthorizedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};