import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/products(.*)",
  "/new(.*)",
  "/checkout",
  "/edit-component(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // First handle authentication for protected routes
  if (isProtectedRoute(req)) await auth.protect();

  // Get the hostname (domain) from the request
  const { hostname, pathname } = new URL(req.url);

  console.log("Middleware processing hostname:", hostname);

  // Check if this is a subdomain request
  const isSubdomainRequest =
    hostname.includes(".floopr.app") &&
    !hostname.startsWith("www.") &&
    hostname !== "floopr.app";

  if (isSubdomainRequest) {
    // Extract the subdomain (productUName)
    const subdomain = hostname.split(".")[0];
    console.log("Detected subdomain:", subdomain);

    // Use query parameter approach instead of headers
    // This is more reliable across different environments
    const rewriteUrl = new URL(`/subdomain-product`, req.url);
    rewriteUrl.searchParams.set("subdomain", subdomain);

    console.log("Rewriting to:", rewriteUrl.toString());

    return NextResponse.rewrite(rewriteUrl);
  }

  // For non-subdomain requests, continue as normal
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|_vercel|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
