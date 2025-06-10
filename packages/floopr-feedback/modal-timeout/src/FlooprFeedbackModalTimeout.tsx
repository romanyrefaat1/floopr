"use client";

import { InputField, Rating } from "./types";
import { cn } from "./utils";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

export type UserInfo = {
  userId?: string;
  username?: string;
  profilePicture?: string;
};

interface FlooprFeedbackModalTimeoutProps {
  apiKey: string;
  productId: string;
  componentId: string;
  userInfo?: UserInfo;
  ImageComponent?: React.ComponentType<any>; // Override for Image
  LinkComponent?: React.ComponentType<any>; // Override for Link
  onClose?: () => void; // Callback to close the modal
  parent?: React.RefObject<HTMLElement>; // Optional parent for portal
}

export default function FlooprFeedbackModalTimeout({
  apiKey,
  productId,
  componentId,
  userInfo = {},
  ImageComponent, // Default to next/image for React component
  LinkComponent, // Default to next/link for React component
  onClose = () => {},
  parent,
}: FlooprFeedbackModalTimeoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [animate, setAnimate] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [timeoutDuration, setTimeoutDuration] = useState(10);
  const [title, setTitle] = useState("Got any feedback?");
  const [ratings, setRatings] = useState<Rating[]>([
    { label: "1", emoji: "1️⃣", value: 1 },
    { label: "2", emoji: "2️⃣", value: 2 },
    { label: "3", emoji: "3️⃣", value: 3 },
    { label: "4", emoji: "4️⃣", value: 4 },
    { label: "5", emoji: "5️⃣", value: 5 },
  ]);
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
  const [inputs, setInputs] = useState<InputField[]>([
    {
      label: "Your feedback",
      placeholder: "Share your feedback",
      id: 1,
      value: "",
    },
  ]);
  const [buttonText, setButtonText] = useState("Submit");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // const apiBaseUrl = `http://localhost:3000`;
  const apiBaseUrl = `https://www.floopr.app`;

  // Construct API URLs based on apiBaseUrl
  const loadUrl = apiBaseUrl
    ? `${apiBaseUrl}/api/imports/components/load-component`
    : "/api/imports/components/load-component";
  const saveUrl = apiBaseUrl
    ? `${apiBaseUrl}/api/imports/components/save-data`
    : "/api/imports/components/save-data";

  // Validate required props
  if (!apiKey || !productId || !componentId) {
    toast.error("Failed to load component data: missing required parameters");
    return null;
  }

  // Normalize userInfo
  const userInfoNormalized = {
    userId: userInfo.userId || "",
    username: userInfo.username || "",
    profilePicture: userInfo.profilePicture || "",
  };

  // Load component data
  useEffect(() => {
    const loadComponent = async () => {
      try {
        const params = new URLSearchParams({
          apiKey,
          productId,
          componentId,
        });

        const response = await fetch(`${loadUrl}?${params}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "force-cache", // This only works with GET
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to load component data");
        }
        // setIsOpen(true);
        setLoaded(true);
        setTitle(data.title);
        setRatings(data.ratings);
        setInputs(data.inputs);
        setIsDarkMode(data.isDark);
        setButtonText(data.buttonText);
        setTimeoutDuration(data.timeoutDuration || 0);
        // If styles are provided, set them
        if (data.style) setStyles(data.style);
      } catch (error) {
        console.error("Error loading component data:", error);
        toast.error(error.message);
      }
    };
    loadComponent();
  }, [apiKey, productId, componentId, loadUrl]);

  // If timeoutDuration is set, open the modal after the specified time
  useEffect(() => {
    if (timeoutDuration >= 0) {
      const timer = setTimeout(() => setIsOpen(true), timeoutDuration * 1000);
      return () => clearTimeout(timer);
    }
  }, [timeoutDuration]);

  const handleRatingClick = (value: number) => {
    setSelectedRating(value);
    setAnimate(value);
    setTimeout(() => setAnimate(null), 800);
  };

  const handleSave = async () => {
    if (selectedRating === null) {
      toast.error("Please select a rating before submitting");
      setError(`"Please select a rating before submitting"`);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(saveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          componentId,
          inputs,
          isComponent: true,
          rating: selectedRating || 0,
          userInfo: userInfoNormalized,
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to save feedback");

      inputs.forEach((input) => {
        input.value = "";
      });
      
      toast.success("Thank you for your feedback!");
      onClose();
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
    setSelectedRating(null);
    setAnimate(null);
    setError(null);
    setIsSubmitting(false);
    setIsOpen(false);
    onClose();
  };

  // Early return if not loaded or not open
  if (!loaded || !isOpen) return null;

  // Sort ratings
  const sortedRatings = [...ratings].sort((a, b) => a.value - b.value);

  // Modify image paths to use absolute URLs when embedded
  const getImagePath = (name: string) => {
    if (apiBaseUrl) {
      return `${apiBaseUrl}/images/${name}`;
    }
    return `/${name}`;
  };

  // Modal content
  const modalContent = (
    <div
      className={cn(
        isDarkMode ? "dark" : "light",
        "p-6 w-full h-full rounded-lg shadow-lg",
        "[--background:0,0%,100%] [--foreground:0,0%,0%]",
        "[--muted:0,0%,96%] [--muted-foreground:0,0%,45%]",
        "[--border:0,0%,90%] [--input:0,0%,90%]",
        "[--primary:250,89%,68%] [--primary-foreground:0,0%,100%]",
        "[--primary-muted: 257, 36%, 65%]",
        "dark:[--background:0,0%,15%] dark:[--foreground:0,0%,100%]",
        "dark:[--muted:0,0%,15%] dark:[--muted-foreground:0,0%,65%]",
        "dark:[--border:0,0%,20%] dark:[--input:0,0%,20%]",
        "dark:[--primary:250,89%,68%] dark:[--primary-foreground:0,0%,100%]",
        "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
      )}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">
          {title}
        </h2>
        <button
          onClick={handleClose}
          className="bg-floopr-purple hover:bg-floopr-purple-dark text-foreground shadow-md hover:shadow-lg transition-all"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
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
      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm font-medium text-[hsl(var(--muted-foreground))] px-3 py-1 rounded-md flex items-center justify-center align-center gap-1">
          <span className="mr-1">Made by</span>
          <LinkComponent
            href={`https://floopr.vercel.app?componentRef=modal-timeout&appRef=${
              typeof window !== "undefined" ? window.location : ""
            }`}
            f
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit h-fit"
          >
            <ImageComponent
              src={getImagePath(
                `${
                  isDarkMode
                    ? "floopr-logo-no-bg-white-svg"
                    : "floopr-logo-no-bg-svg"
                }.svg`
              )}
              alt="floopr logo"
              width={42}
              height={12}
            />
          </LinkComponent>
        </div>
        <button
          onClick={handleSave}
          className={cn(
            "px-5 py-2 rounded-md font-medium transition-colors duration-200",
            "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
            "hover:bg-[hsl(var(--primary-muted))]",
            "disabled:opacity-50"
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : buttonText}
        </button>
      </div>
      <script src="https://cdn.tailwindcss.com"></script>
    </div>
  );

  // Render as portal if parent is provided, otherwise full-page modal
  if (parent && parent.current) {
    return createPortal(
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        {modalContent}
      </div>,
      parent.current
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="max-w-md w-full">{modalContent}</div>
    </div>
  );
}
