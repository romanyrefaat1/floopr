"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollBlurOptions {
  threshold?: number; // Scroll threshold where blur starts
  maxBlur?: number; // Maximum blur amount
}

export const useScrollBlur = (
  ref: React.RefObject<HTMLElement>,
  options: UseScrollBlurOptions = {}
) => {
  const { threshold = 100, maxBlur = 5 } = options;
  const [isBlurred, setIsBlurred] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

      if (scrollDelta > threshold) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return {
    isBlurred,
    blurProps: {
      className: "blur-on-scroll",
      "data-blur": isBlurred,
    },
  };
};
