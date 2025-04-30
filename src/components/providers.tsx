"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { AuthProvider } from "@/contexts/auth-context";
import { ClerkProvider } from "@clerk/nextjs";

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
      <AuthProvider>{children}</AuthProvider>
    </ClerkProvider>
  );
}
