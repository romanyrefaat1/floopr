"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import PricingInitializer from "./PricingInitializer";
import { PricingProvider } from "@/context/pricing-context";
import { AuthProvider } from "@/contexts/auth-context";
import FlooprFeedbackModalTimeout from "@/packages/floopr-feedback/modal-timeout/src/FlooprFeedbackModalTimeout";
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
      // src="http://localhost:3000/embeds/float-button-bundle_floopr_feedback_embed.js"
      data-api-key={process.env.NEXT_PUBLIC_PA_FLOAT_BUTTON_FLOOPR_API_KEY}
      data-product-id="31a4fd3d-615a-409c-97ee-bda48bbbb8e2"
      data-component-id="6e5b7f46-0488-4a85-8564-3f323338471f"
      {...(userInfo && {
        "data-user-info": JSON.stringify(userInfo),
      })}
      strategy="lazyOnload"
      defer
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  useScrollAnimation();

  return (
    <ClerkProvider>
      <PricingProvider>
        <PricingInitializer />
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
        <FlooprFloatButtonScript />
        {/* <Script
          src="http://localhost:3000/embeds/modal-timeout-bundle_floopr_feedback_embed.js"
          defer
          data-api-key="f6e62a27-a969-4d10-a51c-2879c6d46cc7"
          data-product-id="cbb94f24-d36f-48ea-86a4-cb5b8ba99c77"
          data-component-id="7573b5bd-df93-423f-a570-695a26de9721"
          data-api-base-url="https://floopr.vercel.app"
        ></Script> */}

        {/* <FlooprFloatingFeedbackButton
        isModal={false}
        primaryColor="#7D65F6"
        backgroundColor="#ffffff"
        textColor="#000"
        overlayColor="rgb(0 0 0 / 0.5)"
        accentColor="hsl(var(--accent))"
        borderColor="#333"
        padding="md"
        borderRadius="xl"
        feedbackTypeColors={{}}
        // buttonPosition="bottom-right"
        buttonPosition="top-left"
        componentId="6e5b7f46-0488-4a85-8564-3f323338471f"
        productId="31a4fd3d-615a-409c-97ee-bda48bbbb8e2"
        apiKey={process.env.NEXT_PUBLIC_PA_FLOAT_BUTTON_FLOOPR_API_KEY}
        isFixed={true}
      /> */}

        {process.env.NEXT_PUBLIC_IS_PRODUCTION && <Analytics />}
      </PricingProvider>
    </ClerkProvider>
  );
}
