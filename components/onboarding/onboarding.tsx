"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useGuidedOnboarding } from "@/contexts/onboarding/onboarding-context";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const steps = [
  {
    title: "Welcome to Floopr! 👋",
    description:
      "Let's get you started with a quick tour of the main features. 🎉",
  },
  {
    title: "Collect Feedback",
    description:
      "Easily gather feedback from your users and keep track of their ideas.",
  },
  {
    title: "Brainstorm with AI",
    description:
      "Brainstorm with a co-founder that understands you, and your vision.",
  },
  {
    title: "Analyze & Prioritize",
    description:
      "Use our tools to analyze, prioritize, and act on feedback efficiently.",
  },
  {
    title: "Group Feedback into Chuncks",
    description:
      "Group feedback with 1 click powered by AI, and if it messes up. You can always change it manually.",
  },
  {
    title: "Share Updates & Changelogs",
    description:
      "Keep your users in the loop with changelogs and product updates.",
  },
  {
    title: "We made Floopr for you! ⭐",
    description:
      "Whenever you need help, find a bug, or have a cool idea, just let us know! We will use the same tools we give you.",
  },
  {
    title: "Woohoo, let's get you started! 🤟",
    description:
      "Now that you understand the basics, let's set up your account and get you started with Floopr!",
  },
];

export default function Onboarding() {
  const [isCanOnboardingOpen, setIsCanOnboardingOpen] = useState(false);
  const [step, setStep] = useState(0);
  const { user } = useUser();
  const { setActive } = useGuidedOnboarding();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isOnboardingFinished = localStorage.getItem("onboarding-1-finished");
      
      setIsCanOnboardingOpen(isOnboardingFinished !== "true");
    }
  }, []);
  

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "onboarding-1-finished") {
        setIsCanOnboardingOpen(!event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!isCanOnboardingOpen) return null;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("onboarding-1-finished", "true");
      setIsCanOnboardingOpen(false);
      setActive(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding-1-finished", "true");
    setIsCanOnboardingOpen(false);
    setActive(true);
  };

  const { title, description } = steps[step];
  const progressPercent = ((step + 1) / steps.length) * 100;

  return (
    <Dialog open={isCanOnboardingOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md w-full flex flex-col items-center p-0 overflow-hidden">
        <div className="w-full px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">
              Step {step + 1} of {steps.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">
                {Math.round(progressPercent)}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Skip
              </Button>
            </div>
          </div>
          <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="w-full px-6 pb-6 flex flex-col items-center">
          <DialogTitle className="text-2xl text-center mb-2">
            {step === 0 && user?.firstName + ", "}
            {title}
          </DialogTitle>
          <DialogDescription className="text-center mb-6">
            {description}
          </DialogDescription>

          <div className="flex w-full justify-between mt-4">
            <Button variant="outline" onClick={handleBack} disabled={step === 0}>
              Back
            </Button>
            <Button onClick={handleNext}>
              {step === steps.length - 1 ? "Set up my account!" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}