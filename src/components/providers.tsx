"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useScrollAnimation } from "../hooks/use-scroll-animation";

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize scroll animations
  useScrollAnimation();

  return <><ClerkProvider>{children}</ClerkProvider></>;
}
