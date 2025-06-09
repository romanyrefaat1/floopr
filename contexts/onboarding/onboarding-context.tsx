"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Type for a guided onboarding step
export type GuidedOnboardingStep = {
  id: string; // unique id for the step
  route: string; // route where the step should be shown
  targetId: string; // DOM id of the element to popover
  title: string;
  description: string;
  placement?: "top" | "bottom" | "left" | "right";
  desktopPlacement?: "top" | "bottom" | "left" | "right"; // desktop-specific placement
  /**
   * Optional translation offsets for the popover, in pixels.
   * Example: { top: -20, left: 10 }
   */
  translate?: Partial<{
    top: number;
    left: number;
    right: number;
    bottom: number;
  }>;
};

export type GuidedOnboardingContextType = {
  steps: GuidedOnboardingStep[];
  currentStep: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  isActive: boolean;
  setCurrentStep: (step: number) => void;
  setActive: (active: boolean) => void;
};

const defaultSteps: GuidedOnboardingStep[] = [
  {
    id: "create-product",
    route: "/home",
    targetId: "create-new-product-button",
    title: "Create your first product! 🎉",
    description:
      "Click here to start by creating your first product. This is the first step to using Floopr.",
    placement: "bottom",
    desktopPlacement: "bottom", // default to same as placement
  },
  {
    id: "create-product-form",
    route: "/new",
    targetId: "create-new-product-form",
    title: "Fill in these information, please! 📝",
    description:
      "Please fill in these inputs so we can duplicate your product into its own board.",
    placement: "top",
    desktopPlacement: "right", // right on desktop
    translate: {
      top: 40,
    },
  },
  {
    id: "widgets-popover",
    route: "/products/[productId]",
    targetId: "components-tab",
    title: "Woohoo, you created a product! 🎉",
    description:
      "Now let's add some widgets to your product. Click here to open the widgets tab.",
    placement: "left",
    desktopPlacement: "bottom", // desktop
    // translate: {
    //   top: 40,
    // },
  },
  {
    id: "float-button-button",
    route: "/products/[productId]",
    targetId: "add-float-button",
    title: "Let's embed a floating button!",
    description:
      "Click here to customize the Float Button and embed it into your own website.",
    placement: "bottom",
    desktopPlacement: "bottom", // desktop
    // translate: {
    //   top: 40,
    // },
  },
  {
    id: "widgets-all-components",
    route: "/products/[productId]",
    targetId: "all-components-tab",
    title: "Click here to see all components!",
    description: "Click here to see all the widgets Floopr offers.",
    placement: "right",
    desktopPlacement: "bottom", // desktop
    // translate: {
    //   top: 40,
    // },
  },
];

const GuidedOnboardingContext = createContext<
  GuidedOnboardingContextType | undefined
>(undefined);

export const GuidedOnboardingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [steps] = useState<GuidedOnboardingStep[]>(defaultSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setActive] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("onboardingActive");
      return stored !== null ? stored === "true" : false;
    }
    return false;
  });

  // Keep localStorage in sync when isActive changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("onboardingActive", String(isActive));
    }
  }, [isActive]);

  const goToStep = (step: number) => setCurrentStep(step);
  const nextStep = () =>
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <GuidedOnboardingContext.Provider
      value={{
        steps,
        currentStep,
        goToStep,
        nextStep,
        prevStep,
        setCurrentStep,
        isActive,
        setActive,
      }}
    >
      {children}
    </GuidedOnboardingContext.Provider>
  );
};

export const useGuidedOnboarding = () => {
  const ctx = useContext(GuidedOnboardingContext);
  if (!ctx)
    throw new Error(
      "useGuidedOnboarding must be used within a GuidedOnboardingProvider"
    );
  return ctx;
};
