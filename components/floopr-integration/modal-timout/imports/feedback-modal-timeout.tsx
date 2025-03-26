"use client";

import { InputField, Rating } from "../modal-context";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

{
  /*
    title,
  parent,
  ratings,
  inputs,
  buttonText,
  isOpen = true,
  onOpenChange,
  timeoutDuration = 0
    */
}

type ModalTimeoutProps = {
  apiKey: string;
  productId: string;
  componentId: string;
  userInfo?: object;
};

// Modal component
export default function FlooprFeedbackModalTimeout({
  apiKey,
  productId,
  componentId,
  userInfo,
}: ModalTimeoutProps) {
  const [isOpen, setIsOpen] = useState(true);

  const [selectedRating, setSelectedRating] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [animate, setAnimate] = useState(null);

  const [loaded, setLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [timeoutDuration, setTimeoutDuration] = useState(10);
  const [title, setTitle] = useState("Got any feedback?");
  const [ratings, setRatings] = useState([
    { label: "1", emoji: "1️⃣", value: 1 },
    { label: "2", emoji: "2️⃣", value: 2 },
    { label: "3", emoji: "3️⃣", value: 3 },
    { label: "4", emoji: "4️⃣", value: 4 },
    { label: "5", emoji: "5️⃣", value: 5 },
  ] as Rating[]);

  const [styles, setStyles] = useState({
    accentColor: "#dbeafe",
    animation: "none",
    backgroundColor: "white",
    borderRadius: "0.375rem",
    fontFamily: "inherit",
    fontSize: "1rem",
    headingStyle: "bold",
    layout: "grid",
    primaryColor: "#3b82f6",
    secondaryColor: "#f3f4f6",
    shadowStyle: "soft",
    spacing: "comfortable",
    textColor: "#1f2937",
  });

  const [inputs, setInputs] = useState([
    {
      label: "Your feedback",
      placeholder: "Share your feedback",
      id: 1,
      value: "",
    },
  ] as InputField[]);
  const [buttonText, setButtonText] = useState("Submit");

  const [isDarkMode, setIsDarkMode] = useState(true);

  // Return null early if modal shouldn't be shown
  if (!apiKey || !productId || !componentId) {
    toast.error("Failed to load component data: missing required parameters");
    return null;
  }

  let userInfoFromProps: {
    userId: string;
    username: string;
    profilePicture: string;
  } | null = {
    userId: "",
    username: "",
    profilePicture: "",
  };

  if (userInfo) {
    userInfoFromProps = userInfo;
  }

  // Load component data from database
  useEffect(() => {
    const loadComponent = async () => {
      try {
        const response = await fetch(`/api/imports/components/load-component`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apiKey,
            productId,
            componentId,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          toast.error("Failed to load component data:", data.error);
          return null;
        }
        setLoaded(true);
        // set new data
        setTitle(data.title);
        setRatings(data.ratings);
        setInputs(data.inputs);
        setIsDarkMode(data.isDark);
        console.log(`style data loaded`, data.style, data);
        if (data.style) {
          setStyles(data.style);
        }

        setButtonText(data.buttonText);
        setTimeoutDuration(data.timeoutDuration);
        console.log(`product feedback modal loaded:`, data);
      } catch (error) {
        console.error("Error loading component data:", error);
        return null;
      }
    };

    // Call the loadComponent function
    loadComponent();
  }, [apiKey, productId, componentId]);

  const handleRatingClick = (value) => {
    setSelectedRating(value);
    setAnimate(value);
    setTimeout(() => setAnimate(null), 800);
  };

  const handleSave = async () => {
    // Validate feedback before submitting

    if (selectedRating === null) {
      toast.error("Please select a rating before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      // Log what we're sending for debugging
      console.log("Sending feedback data:", {
        productId,
        componentId,
        feedback: inputs,
        rating: selectedRating,
        userInfo: userInfoFromProps,
      });

      const response = await fetch(`/api/imports/components/save-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          componentId,
          feedback: inputs,
          isComponent: true,
          rating: selectedRating,
          userInfo: userInfoFromProps,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server response:", data);
        throw new Error(data.error || "Failed to save feedback");
      }

      toast.success("Thank you for your feedback!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving feedback:", error);
      toast.error(
        error.message || "Failed to save feedback. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Sort ratings by value to ensure they appear in the correct order
  const sortedRatings = [...ratings].sort((a, b) => a.value - b.value);

  // The modal content (shared between both rendering methods)
  const modalContent = (
    <div
      className={cn(
        isDarkMode ? "dark" : "light",
        "p-6 w-full h-full rounded-lg shadow-lg",
        "[--background:0,0%,100%] [--foreground:0,0%,0%]", // Light mode defaults
        "[--muted:0,0%,96%] [--muted-foreground:0,0%,45%]",
        "[--border:0,0%,90%] [--input:0,0%,90%]",
        "[--primary:250,89%,68%] [--primary-foreground:0,0%,100%]",
        // Dark mode overrides
        "dark:[--background:0,0%,15%] dark:[--foreground:0,0%,100%]",
        "dark:[--muted:0,0%,15%] dark:[--muted-foreground:0,0%,65%]",
        "dark:[--border:0,0%,20%] dark:[--input:0,0%,20%]",
        "dark:[--primary:250,89%,68%] dark:[--primary-foreground:0,0%,100%]",
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
        {/* Line connecting the ratings */}
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
          <label className="block text-[hsl(var(--foreground))] text-left mb-2 font-medium">
            {input.label}
          </label>
          <input
            type="text"
            placeholder={input.placeholder}
            value={input.value}
            onChange={(e) =>
              setInputs((prev) => {
                const newInputs = [...prev];
                newInputs[index] = { ...input, value: e.target.value };
                return newInputs;
              })
            }
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
        <div className="text-sm font-medium text-[hsl(var(--muted-foreground))] px-3 py-1 rounded-md flex items-center justify-center align-center gap-1">
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
            "hover:bg-[hsl(var(--primary)/0.9)]",
            "disabled:opacity-50"
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : buttonText}
        </button>
      </div>
    </div>
  );

  if (!loaded) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  // Mode 1: In-container modal
  if (parent && parent.current) {
    return createPortal(
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        {modalContent}
      </div>,
      parent.current
    );
  }

  // Mode 2: Full-page modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="max-w-md w-full">{modalContent}</div>
    </div>
  );
}
