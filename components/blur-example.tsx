"use client";

import { useScrollBlur } from "@/hooks/use-scroll-blur";
import { useRef } from "react";

export const BlurExample = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { blurProps } = useScrollBlur(
    elementRef as React.RefObject<HTMLElement>,
    {
      threshold: 50,
      maxBlur: 8,
    }
  );

  return (
    <div ref={elementRef} {...blurProps}>
      {/* Your content here */}
      <h2>This content will blur on fast scroll</h2>
      <p>Scroll quickly to see the blur effect!</p>
    </div>
  );
};
