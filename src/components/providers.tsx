"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import FloatingFeedbackButton from "@/components/floopr-integration/float-button-circle/floating-feedback-button";
import { AuthProvider } from "@/contexts/auth-context";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

function FeedbackScript() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const userInfo = user
    ? {
        userId: user.id,
        userName: user.fullName || user.username || "Anonymous User",
        userImage: user.imageUrl || null,
      }
    : null;

  const scriptProps = {
    src: "https://floopr.vercel.app/embeds/float-button-bundle_floopr_feedback_embed.js",
    "data-api-key": process.env.PA_FLOAT_BUTTON_FLOOPR_API_KEY,
    "data-product-id": "31a4fd3d-615a-409c-97ee-bda48bbbb8e2",
    "data-component-id": "92182c5d-232c-45a5-952e-ec92194ad16a",
    defer: true,
  };

  if (userInfo) {
    scriptProps["data-user-info"] = JSON.stringify(userInfo);
  }

  return <script {...scriptProps} />;
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize scroll animations
  useScrollAnimation();

  return (
    <ClerkProvider>
      <AuthProvider>
        {children}
        <FeedbackScript />
      </AuthProvider>
      <Toaster />
      {process.env.NEXT_PUBLIC_IS_PRODUCTION && <Analytics />}
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
