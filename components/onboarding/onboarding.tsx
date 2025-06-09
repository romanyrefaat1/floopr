"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";

const steps = [
  {
    // image: "/images/land/dashboard-preview.png",
    title: "Welcome to Floopr! 👋",
    description:
      "Let's get you started with a quick tour of the main features. 🎉",
    // moreInfo: {
    //   title: "We are working on this:",
    //   list: [
    //     "Email users with updated for changelogs",
    //     "AI-powered feedback grouping",
    //     "AI-powered feedback analysis",
    //   ],
    // },
  },
  {
    // image: "/onboarding-step2.png",
    title: "Collect Feedback",
    description:
      "Easily gather feedback from your users and keep track of their ideas.",
  },
  {
    // image: "/onboarding-step3.png",
    title: "Brainstorm with AI",
    description:
      "Brainstorm with a co-founder that understands you, and your vision.",
  },
  {
    // image: "/onboarding-step3.png",
    title: "Analyze & Prioritize",
    description:
      "Use our tools to analyze, prioritize, and act on feedback efficiently.",
  },
  {
    // image: "/onboarding-step3.png",
    title: "Group Feedback into Chuncks",
    description:
      "Group feedback with 1 click powered by AI, and if it messes up. You can always change it manually.",
  },
  {
    // image: "/onboarding-step4.png",
    title: "Share Updates & Changelogs",
    description:
      "Keep your users in the loop with changelogs and product updates.",
  },
  {
    // image: "/onboarding-step4.png",
    title: "We made Floopr for you! ⭐",
    description:
      "Whenever you need help, find a bug, or have a cool idea, just let us know! We will use the same tools we give you.",
  },
  {
    // image: "/onboarding-step4.png",
    title: "Let's get you started! 🤟",
    description:
      "Now that you understand the basics, let's set up your account and get you started with Floopr!",
  },
];

export default function Onboarding() {
  const [isCanOnboardingOpen, setIsCanOnboardingOpen] = useState(true);
  const [step, setStep] = useState(0);
  const { user } = useUser();

  // Cursor-following tooltip state
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  if (!isCanOnboardingOpen) return null;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setIsCanOnboardingOpen(false);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const { image, title, description, moreInfo } = steps[step];

  // Progress calculation
  const progressPercent = ((step + 1) / steps.length) * 100;

  // Handler for mouse move inside image
  const handleImageMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!moreInfo) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setShowTooltip(true);
  };

  const handleImageMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <Dialog open={isCanOnboardingOpen} onOpenChange={setIsCanOnboardingOpen}>
      <DialogContent className="max-w-md w-full flex flex-col items-center p-0 overflow-hidden">
        {/* Beautiful Progress Indicator */}
        <div className="w-full px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">
              Step {step + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {Math.round(progressPercent)}%
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            {/* Background gradient for visual appeal */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full" />

            {/* Animated Progress Bar */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{
                width: `${progressPercent}%`,
                boxShadow: "0 0 10px rgba(139, 69, 255, 0.3)",
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full" />
            </div>

            {/* Step indicators */}
            <div className="absolute inset-0 flex justify-between items-center px-1">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full border-2 transition-all duration-300 ${
                    idx <= step
                      ? "bg-white border-white shadow-sm"
                      : "bg-gray-100 border-gray-300"
                  }`}
                  style={{
                    boxShadow:
                      idx <= step ? "0 0 6px rgba(255, 255, 255, 0.8)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full px-6 pb-6 flex flex-col items-center">
          {/* Step Content */}
          {image && (
            <div
              className="relative w-full mb-4 rounded-3xl cursor-pointer"
              style={{ height: 200 }}
              onMouseMove={moreInfo ? handleImageMouseMove : undefined}
              onMouseLeave={moreInfo ? handleImageMouseLeave : undefined}
            >
              <Image
                src={image}
                alt="Onboarding step"
                width={300}
                height={200}
                className="object-contain w-full h-full rounded-3xl"
                priority
              />

              {/* Custom cursor-following tooltip */}
              {moreInfo && showTooltip && (
                <div
                  className="absolute pointer-events-none z-50 bg-white shadow-lg border rounded-xl p-4 text-sm transition-all duration-75 ease-out"
                  style={{
                    left: tooltipPos.x + 16,
                    top: tooltipPos.y + 16,
                    minWidth: 220,
                    maxWidth: 300,
                    transform: "translate(0, -50%)", // Center vertically relative to cursor
                  }}
                >
                  <div className="font-semibold text-md mb-2">
                    {moreInfo.title}
                  </div>
                  <ul className="list-disc pl-5 text-sm">
                    {moreInfo.list.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <DialogTitle className="text-2xl text-center mb-2">
            {step === 0 && user?.firstName + ", "}
            {title}
          </DialogTitle>

          <DialogDescription className="text-center mb-6">
            {description}
          </DialogDescription>

          <div className="flex w-full justify-between mt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {step === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
