"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize scroll animations
  useScrollAnimation();

  return <>{children}</>;
}
