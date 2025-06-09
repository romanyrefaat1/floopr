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
  // Optionally, add more fields for actions, etc.
};

export type GuidedOnboardingContextType = {
  steps: GuidedOnboardingStep[];
  currentStep: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  isActive: boolean;
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
  },
  // Add more steps as needed
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
  const [isActive, setActive] = useState(false);

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
