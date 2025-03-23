"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalTimeoutProps = {
  title: string;
  parent?: React.RefObject<HTMLElement>;
  ratings: {
    label: string;
    emoji: string;
    value: number;
  }[];
  inputs: {
    label: string;
    placeholder: string;
  }[];
  buttonText: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  timeoutDuration?: number;
  isDarkMode: boolean;
};

// Modal component
export default function ModalTimeout({
  title,
  parent,
  ratings,
  inputs,
  buttonText,
  isOpen = true,
  onOpenChange,
  timeoutDuration = 0,
  isDarkMode = false,
}: ModalTimeoutProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [animate, setAnimate] = useState<number | null>(null);

  // Auto-close the modal if timeoutDuration is set
  useEffect(() => {
    if (timeoutDuration > 0 && isOpen) {
      const timer = setTimeout(() => {
        if (onOpenChange) {
          onOpenChange(false);
        }
      }, timeoutDuration * 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onOpenChange, timeoutDuration]);

  const handleRatingClick = (value: number) => {
    setSelectedRating(value);
    setAnimate(value);
    setTimeout(() => setAnimate(null), 800);
  };

  const handleSave = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  // Sort ratings by value to ensure they appear in the correct order
  const sortedRatings = [...ratings].sort((a, b) => a.value - b.value);

  // The modal content (shared between both rendering methods)
  const modalContent = (
    <div
      className={cn(
        "p-6 w-full h-full rounded-lg shadow-lg",
        // Apply background and text colors
        "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
      )}
    >
      {/* Title and close button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">
          {title}
        </h2>
        <button
          onClick={handleClose}
          className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Rating options */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-[hsl(var(--border))]" />

        {sortedRatings.map((rating, index) => (
          <div key={index} className="flex flex-col items-center z-10">
            <button
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300 relative",
                selectedRating === rating.value
                  ? "bg-[hsl(var(--primary))] border-[hsl(var(--primary))]"
                  : "bg-[hsl(var(--muted))] border-[hsl(var(--border))]"
              )}
              onClick={() => handleRatingClick(rating.value)}
            >
              <span
                className={cn(
                  "transition-all duration-500 transform",
                  animate === rating.value ? "scale-125" : "scale-100"
                )}
              >
                {rating.emoji}
              </span>
              {animate === rating.value && (
                <span className="absolute inset-0 rounded-full bg-[hsl(var(--primary)/0.5)] animate-ping" />
              )}
            </button>
            <span className="text-sm text-[hsl(var(--muted-foreground))] mt-2">
              {rating.label}
            </span>
          </div>
        ))}
      </div>

      {/* Feedback inputs */}
      {inputs.map((input, index) => (
        <div key={index} className="mb-6">
          <label className="block text-[hsl(var(--foreground))] mb-2 font-medium">
            {input.label}
          </label>
          <input
            type="text"
            placeholder={input.placeholder}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={cn(
              "w-full border rounded-md p-3",
              "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]",
              "border-[hsl(var(--input))]",
              "focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
            )}
          />
        </div>
      ))}

      {/* Footer */}
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm font-medium  text-[hsl(var(--muted-foreground))] px-3 py-1 rounded-md flex items-center justify-center align-center gap-1">
          <span className="mr-1">Made by</span>
          <Link
            href={`https://floopr.vercel.app?componentRef=modal-timeout&appRef=${window.location}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit h-fit"
          >
            <Image
              src={`/${
                isDarkMode
                  ? `floopr-logo-no-bg-white-svg`
                  : `floopr-logo-no-bg-svg`
              }.svg`}
              alt="floopr logo"
              width={42}
              height={12}
            />
          </Link>
        </div>
        <button
          onClick={handleSave}
          className={cn(
            "px-5 py-2 rounded-md font-medium transition-colors duration-200",
            "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
            "hover:bg-[hsl(var(--primary)/0.9)]"
          )}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );

  // Return null early if modal shouldn't be shown
  if (!isOpen) {
    return null;
  }

  // Mode 1: In-container modal
  if (parent && parent.current) {
    return createPortal(
      <div
        className={cn(
          "absolute inset-0 z-50 flex items-center justify-center bg-black/30",
          isDarkMode ? "dark" : "",
          "[--background:0,0%,100%] [--foreground:0,0%,0%]",
          "[--muted:0,0%,96%] [--muted-foreground:0,0%,45%]",
          "[--border:0,0%,90%] [--input:0,0%,90%]",
          "[--primary:250,89%,68%] [--primary-foreground:0,0%,100%]",
          // Dark mode overrides
          "dark:[--background:0,0%,15%] dark:[--foreground:0,0%,100%]",
          "dark:[--muted:0,0%,15%] dark:[--muted-foreground:0,0%,65%]",
          "dark:[--border:0,0%,20%] dark:[--input:0,0%,20%]",
          "dark:[--primary:250,89%,68%] dark:[--primary-foreground:0,0%,100%]"
        )}
      >
        <div className="max-w-md w-full">{modalContent}</div>
      </div>,
      parent.current
    );
  }

  // Mode 2: Full-page modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="max-w-md w-full">{modalContent}</div>
    </div>
  );
}
