"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import FloatingFeedbackButton from "@/components/floopr-integration/float-button-circle/floating-feedback-button";
import { AuthProvider } from "@/contexts/auth-context";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize scroll animations
  useScrollAnimation();

  return (
    <ClerkProvider>
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
      {process.env.NEXT_PUBLIC_IS_PRODUCTION && <Analytics />}
      {/* <script
        src="https://floopr.vercel.app/embeds/float-button-bundle_floopr_feedback_embed.js"
        data-api-key="0321d470-660b-4f50-828d-d36529a18a68"
        data-product-id="31a4fd3d-615a-409c-97ee-bda48bbbb8e2"
        data-component-id="3cee1333-8961-4faa-82f0-c554db92408c"
        data-user-info='{"userId": "user_123", "userName": "User Name", "userImage": "https://example.com/avatar.jpg"}' // Optional
        defer
      ></script>
      <script
        src="https://floopr.vercel.app/embeds/float-button-bundle_floopr_feedback_embed.js"
        data-api-key="f873ce95-0379-4a1b-8193-94fb6a615616"
        data-product-id="31a4fd3d-615a-409c-97ee-bda48bbbb8e2"
        data-component-id="4111ca81-fb29-449c-b314-b5cd1895db0e"
        data-user-info='{"userId": "user_123", "userName": "User Name", "userImage": "https://example.com/avatar.jpg"}' // Optional
        defer
      ></script> */}
      <FloatingFeedbackButton
        position="bottom-left"
        isModal={false}
        backgroundColor="#ffffff"
        padding="lg"
        borderRadius="lg"
        isSecondSectionColorLikeFeatureType={false}
        componentId={`not_yet_implemented`}
        productId={`31a4fd3d-615a-409c-97ee-bda48bbbb8e2`}
      />
    </ClerkProvider>
  );
}
