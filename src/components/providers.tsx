"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { AuthProvider } from "@/contexts/auth-context";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { Toaster } from "sonner";

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
      data-api-key={process.env.PA_FLOAT_BUTTON_FLOOPR_API_KEY}
      data-product-id="31a4fd3d-615a-409c-97ee-bda48bbbb8e2"
      data-component-id="6e5b7f46-0488-4a85-8564-3f323338471f"
      {...(userInfo && {
        "data-user-info": JSON.stringify(userInfo),
      })}
      strategy="lazyOnload" // or "afterInteractive"
      defer
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize scroll animations
  useScrollAnimation();

  return (
    <ClerkProvider>
      <AuthProvider>{children}</AuthProvider>
      <Toaster />

      {/* <FlooprFloatButtonScript /> */}
      {/* <FlooprFloatButtonScript
        apiKey={process.env.PA_FLOAT_BUTTON_FLOOPR_API_KEY}
        productId={`31a4fd3d-615a-409c-97ee-bda48bbbb8e2`}
        componentId={`6e5b7f46-0488-4a85-8564-3f323338471f`}
      /> */}
      {process.env.NEXT_PUBLIC_IS_PRODUCTION && <Analytics />}
    </ClerkProvider>
  );
}
