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
      <script
        src="https://floopr.vercel.app/embeds/float-button-bundle_floopr_feedback_embed.js"
        data-api-key="c83a759b-e172-4346-afee-4869330103bf"
        data-product-id="31a4fd3d-615a-409c-97ee-bda48bbbb8e2"
        data-component-id="92182c5d-232c-45a5-952e-ec92194ad16a"
        data-user-info='{"userId": "user_123", "userName": "User Name", "userImage": "https://example.com/avatar.jpg"}' // Optional
        defer
      ></script>
      {/* <FloatingFeedbackButton
        position="bottom-left"
        isModal={false}
        backgroundColor="#ffffff"
        padding="lg"
        borderRadius="lg"
        isSecondSectionColorLikeFeatureType={false}
        componentId={`not_yet_implemented`}
        productId={`31a4fd3d-615a-409c-97ee-bda48bbbb8e2`}
      /> */}
    </ClerkProvider>
  );
}
