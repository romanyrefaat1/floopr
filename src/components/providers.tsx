"use client";

// import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ProgressProvider } from "@bprogress/next/app";

import { ClerkProvider, useUser } from "@clerk/nextjs";
import { PricingProvider } from "@/context/pricing-context";
import PricingInitializer from "./PricingInitializer";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "sonner";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

export function FlooprFloatButtonScript() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return null;
  const userInfo = user
    ? {
        userId: user.id,
        userName: user.fullName || user.username || "Anonymous User",
        userImage: user.imageUrl || null,
      }
    : null;
  return (
    <Script
      id="floopr-feedback"
      src="https://floopr.vercel.app/embeds/float-button-bundle_floopr_feedback_embed.js"
      data-api-key={process.env.NEXT_PUBLIC_PA_FLOAT_BUTTON_FLOOPR_API_KEY}
      data-product-id="31a4fd3d-615a-409c-97ee-bda48bbbb8e2"
      data-component-id="6e5b7f46-0488-4a85-8564-3f323338471f"
      {...(userInfo && { "data-user-info": JSON.stringify(userInfo) })}
      strategy="lazyOnload"
      defer
    />
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ProgressProvider
          options={{ showSpinner: false }}  // any BProgress.configure() options
          height="4px"                      // bar thickness
          color="#7D65F6"                      // bar color
          shallowRouting                    // disable on only-query-change navs
        >
      <PricingProvider>
        <PricingInitializer />
        <AuthProvider>
          {children}
          {/* <ProgressBar
            height="4px"
            color="#fffd00"
            options={{ showSpinner: false }}
            shallowRouting
      /> */}
        </AuthProvider>
        <Toaster />
        <FlooprFloatButtonScript />
        {process.env.NEXT_PUBLIC_IS_PRODUCTION && <Analytics />}
      </PricingProvider>
      </ProgressProvider>
    </ClerkProvider>
  );
}
