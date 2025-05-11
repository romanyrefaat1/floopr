"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function EditComponentOnBoard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const componentTypeName = searchParams.get("componentTypeName");
  const productRef = searchParams.get("ref");

  if (!componentTypeName || !productRef) {
    return notFound();
  }

  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (currentStep === 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(2);
        setIsAnimating(false);
      }, 300);
    } else {
      // Create component and redirect
      router.push(
        `/edit-component/${componentTypeName}?userTitle=${encodeURIComponent(
          title
        )}&userDescription=${encodeURIComponent(description)}&ref=${productRef}`
      );
    }
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(1);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-20 p-4">
      <Card className="w-full max-w-xl p-8">
        <div className="space-y-8">
          {/* Progress indicator */}
          <div className="flex justify-center space-x-4">
            <div
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentStep === 1 ? "bg-primary scale-125" : "bg-muted"
              }`}
            />
            <div
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentStep === 2 ? "bg-primary scale-125" : "bg-muted"
              }`}
            />
          </div>

          {/* Content container with animation */}
          <div className="relative min-h-[250px]">
            {/* Step 1: Title */}
            <div
              className={`absolute inset-0 transition-all duration-300 ${
                currentStep === 1
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 -translate-x-full scale-95"
              } ${isAnimating ? "pointer-events-none" : ""}`}
            >
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-2xl font-bold">Name your component</h1>
                  <p className="text-muted-foreground">
                    Give your component a clear and descriptive name
                  </p>
                </div>

                <Input
                  placeholder="e.g., Customer Feedback Form"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                />

                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    disabled={!title.trim() || isAnimating}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 2: Description */}
            <div
              className={`absolute inset-0 transition-all duration-300 ${
                currentStep === 2
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-full scale-95"
              } ${isAnimating ? "pointer-events-none" : ""}`}
            >
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-2xl font-bold">
                    Describe your component
                  </h1>
                  <p className="text-muted-foreground">
                    Explain how you plan to use this component
                  </p>
                </div>

                <Textarea
                  placeholder="e.g., This feedback form will be used on our product page to collect user feedback..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] text-lg"
                />

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={isAnimating}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!description.trim() || isAnimating}
                  >
                    Create Component
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
