"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { AuthProvider } from "@/contexts/auth-context";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

// Default style for ProductStyleProvider
const defaultProductStyle = {
  primaryColor: "#7C3AED",
  secondaryColor: "#6c757d",
  accentColor: "#fd7e14",
  backgroundColor: "#f8f9fa",
  textColor: "#212529",
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  headingStyle: "bold",
  layout: "grid",
  spacing: "comfortable",
  borderRadius: "4px",
  shadowStyle: "soft",
  animation: "none",
};

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize scroll animations
  useScrollAnimation();

  return (
    <ClerkProvider>
      <AuthProvider>
        <UserScript />
        {children}
      </AuthProvider>
      <Toaster />
      <Analytics />
    </ClerkProvider>
  );
}

function UserScript() {
  const user = useUser();

  return (
    <script
      src="http://localhost:3000/embeds/float-button-bundle_floopr_feedback_embed.js"
      data-api-key={process.env.FLOOPR_API_KEY}
      data-product-id="31a4fd3d-615a-409c-97ee-bda48bbbb8e2"
      data-component-id="3cee1333-8961-4faa-82f0-c554db92408c"
      data-user-info={`{"userId": "${
        user.user?.id || `Anonymous User`
      }", "userName": "${
        user.user?.fullName || `Anonymous User`
      }", "userImage": "${user.user?.imageUrl || null}"}`}
      defer
    ></script>
  );
}
