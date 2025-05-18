"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { AuthProvider } from "@/contexts/auth-context";
import FlooprFloatingFeedbackButton from "@/packages/floopr-feedback/float-button/src/floating-feedback-button";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

export function FeedbackScript() {
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
    "data-component-id": "6e5b7f46-0488-4a85-8564-3f323338471f",
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
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
      {/* <FlooprFloatingFeedbackButton
        apiKey={process.env.PA_FLOAT_BUTTON_FLOOPR_API_KEY}
        productId={`31a4fd3d-615a-409c-97ee-bda48bbbb8e2`}
        componentId={`6e5b7f46-0488-4a85-8564-3f323338471f`}
      /> */}
      <script
        src={
          "https://floopr.vercel.app/embeds/float-button-bundle_floopr_feedback_embed.js"
        }
        // src={
        //   "http://localhost:3000/embeds/float-button-bundle_floopr_feedback_embed.js"
        // }
        data-api-key={process.env.PA_FLOAT_BUTTON_FLOOPR_API_KEY}
        data-product-id="31a4fd3d-615a-409c-97ee-bda48bbbb8e2"
        data-component-id="6e5b7f46-0488-4a85-8564-3f323338471f"
        // data-user-info='{"userId": "user_123", "userName": "User Name", "userImage": "https://example.com/avatar.jpg"}' // Optional
        defer
      ></script>
      {process.env.NEXT_PUBLIC_IS_PRODUCTION && <Analytics />}
    </ClerkProvider>
  );
}
