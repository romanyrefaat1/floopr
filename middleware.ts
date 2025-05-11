import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/products(.*)",
  "/new(.*)",
  "/checkout",
  "/edit-component(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // 1️⃣ protect routes as before
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // 2️⃣ grab hostname and pathname off the NextURL
  const { hostname, nextUrl } = req;

  // 3️⃣ detect subdomain-style URLs
  const isSubdomainRequest =
    hostname.endsWith(".floopr.app") &&
    !hostname.startsWith("www.") &&
    hostname !== "floopr.app";

  if (isSubdomainRequest) {
    const subdomain = hostname.split(".")[0];

    // 4️⃣ clone the NextURL so we don’t mutate the original
    const rewriteUrl = nextUrl.clone();

    // 5️⃣ override the pathname
    rewriteUrl.pathname = "/subdomain-product";

    // 6️⃣ set your subdomain query param
    rewriteUrl.searchParams.set("subdomain", subdomain);

    console.log("Rewriting to:", rewriteUrl.toString());
    return NextResponse.rewrite(rewriteUrl);
  }

  // 7️⃣ otherwise continue
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|_vercel|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};