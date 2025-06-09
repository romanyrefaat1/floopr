"use client";

import { useGuidedOnboarding } from "@/contexts/onboarding/onboarding-context";
import React, { useEffect, useRef, useState } from "react";

interface GuidedOnboardingPopoverProps {
  stepIndex: number;
  waitMs?: number; // Optional timeout in ms before showing popover
}

const GuidedOnboardingPopover: React.FC<GuidedOnboardingPopoverProps> = ({
  stepIndex,
  waitMs = 0,
}) => {
  const { steps, currentStep, isActive, nextStep, prevStep, setActive } =
    useGuidedOnboarding();
  const step = steps[stepIndex];
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [visible, setVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let rafId: number | null = null;
    function updateRect() {
      const el = document.getElementById(step.targetId);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
        setVisible(true);
        el.classList.add("guided-onboarding-highlight");
      } else {
        setVisible(false);
      }
    }
    if (!isActive || currentStep !== stepIndex) {
      setVisible(false);
      return;
    }
    timeoutId = setTimeout(() => {
      updateRect();
      // Listen for scroll/resize to keep popover and overlay anchored
      window.addEventListener("scroll", updateRect, true);
      window.addEventListener("resize", updateRect);
    }, waitMs);
    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
      const el = document.getElementById(step.targetId);
      if (el) el.classList.remove("guided-onboarding-highlight");
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isActive, currentStep, step.targetId, stepIndex, waitMs]);

  if (!visible || !targetRect) return null;

  // Calculate popover position based on placement with proper spacing
  const spacing = 16;
  let style: React.CSSProperties = {
    position: "fixed",
    zIndex: 10001, // Higher than overlay (10000) and target (10000)
    pointerEvents: "auto",
    left: targetRect.left + targetRect.width / 2,
    top: targetRect.bottom + spacing,
    transform: "translate(-50%, 0)",
  };

  // Arrow positioning and rotation
  let arrowStyle: React.CSSProperties = {
    position: "absolute",
    width: 0,
    height: 0,
    borderStyle: "solid",
  };

  if (step.placement === "top") {
    style.top = targetRect.top - spacing;
    style.transform = "translate(-50%, -100%)";
    // Arrow pointing down
    arrowStyle = {
      ...arrowStyle,
      bottom: -6,
      left: "50%",
      transform: "translateX(-50%)",
      borderWidth: "6px 6px 0 6px",
      borderColor: "white transparent transparent transparent",
    };
  } else if (step.placement === "left") {
    style.left = targetRect.left - spacing;
    style.top = targetRect.top + targetRect.height / 2;
    style.transform = "translate(-100%, -50%)";
    // Arrow pointing right
    arrowStyle = {
      ...arrowStyle,
      right: -6,
      top: "50%",
      transform: "translateY(-50%)",
      borderWidth: "6px 0 6px 6px",
      borderColor: "transparent transparent transparent white",
    };
  } else if (step.placement === "right") {
    style.left = targetRect.right + spacing;
    style.top = targetRect.top + targetRect.height / 2;
    style.transform = "translate(0, -50%)";
    // Arrow pointing left
    arrowStyle = {
      ...arrowStyle,
      left: -6,
      top: "50%",
      transform: "translateY(-50%)",
      borderWidth: "6px 6px 6px 0",
      borderColor: "transparent white transparent transparent",
    };
  } else {
    // Default: bottom placement
    // Arrow pointing up
    arrowStyle = {
      ...arrowStyle,
      top: -6,
      left: "50%",
      transform: "translateX(-50%)",
      borderWidth: "0 6px 6px 6px",
      borderColor: "transparent transparent white transparent",
    };
  }

  return (
    <>
      {/* Overlay with cutout for target element */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          pointerEvents: "auto", // Make overlay block pointer events
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(4px)",
          clipPath: `polygon(
    0 0,
    100vw 0,
    100vw 100vh,
    0 100vh,
    0 0,
    0 ${targetRect.top - 8}px,
    ${targetRect.left - 8}px ${targetRect.top - 8}px,
    ${targetRect.left - 8}px ${targetRect.bottom + 8}px,
    ${targetRect.right + 8}px ${targetRect.bottom + 8}px,
    ${targetRect.right + 8}px ${targetRect.top - 8}px,
    0 ${targetRect.top - 8}px
  )`,
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click-through
      />

      {/* Popover */}
      <div ref={popoverRef} className="fade-in" style={style}>
        <div className="relative max-w-xs w-64 p-3 shadow-lg border bg-white rounded-lg transition-all duration-200 ease-out backdrop-blur-md bg-white/90">
          {/* Skip button at top right */}
          <button
            className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
            onClick={() => setActive(false)}
            tabIndex={0}
          >
            Skip
          </button>
          {/* Arrow */}
          <div style={arrowStyle} />
          {/* Shadow for arrow */}
          <div
            style={{
              ...arrowStyle,
              borderColor:
                step.placement === "top"
                  ? "#e5e7eb transparent transparent transparent"
                  : step.placement === "left"
                  ? "transparent transparent transparent #e5e7eb"
                  : step.placement === "right"
                  ? "transparent #e5e7eb transparent transparent"
                  : "transparent transparent #e5e7eb transparent",
              zIndex: -1,
              ...(step.placement === "top" && { bottom: -7 }),
              ...(step.placement === "left" && { right: -7 }),
              ...(step.placement === "right" && { left: -7 }),
              ...(step.placement === "bottom" && { top: -7 }),
            }}
          />
          {/* Content */}
          <div className="font-semibold text-sm mb-1">{step.title}</div>
          <div className="text-xs mb-3 text-gray-600 leading-relaxed">
            {step.description}
          </div>
          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <button
              className="px-2 py-1 rounded text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button
              className="px-2 py-1 rounded text-xs bg-floopr-purple hover:bg-floopr-purple/90 text-white transition-colors duration-150"
              onClick={nextStep}
            >
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Add the CSS for the highlight (without blur)
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    .guided-onboarding-highlight {
      position: relative !important;
      z-index: 10000 !important;
      border-radius: 0.5rem;
      transition: all 0.2s ease-in-out;
      /* Optional: Add a subtle glow or border to make it stand out */
      box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.5), 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `;
  if (!document.head.querySelector("style[data-guided-onboarding-highlight]")) {
    style.setAttribute("data-guided-onboarding-highlight", "");
    document.head.appendChild(style);
  }
}

export default GuidedOnboardingPopover;
