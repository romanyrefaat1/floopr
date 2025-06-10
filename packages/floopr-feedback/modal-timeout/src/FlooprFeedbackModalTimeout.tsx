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
  const [showModal, setShowModal] = useState(false); // For animation control
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
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Trigger animation after a brief delay
        setTimeout(() => setShowModal(true), 10);
      }, timeoutDuration * 1000);
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
          referenceLink: window.location.href || null,
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
    // Animate out
    setShowModal(false);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setSelectedRating(null);
      setAnimate(null);
      setError(null);
      setIsSubmitting(false);
      setIsOpen(false);
      onClose();
    }, 200);
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
  // Replace the modalContent div className with this:
const modalContent = (
  <div
    className={cn(
      isDarkMode ? "dark" : "", // Only add 'dark' class when isDarkMode is true
      "p-6 w-full h-full rounded-lg shadow-lg",
      // Conditional CSS variables based on isDarkMode
      isDarkMode ? [
        // Dark mode variables
        "[--background:0,0%,15%] [--foreground:0,0%,100%]",
        "[--muted:0,0%,15%] [--muted-foreground:0,0%,65%]",
        "[--border:0,0%,20%] [--input:0,0%,20%]",
        "[--primary:250,89%,68%] [--primary-foreground:0,0%,100%]",
        "[--primary-muted:257,36%,65%]"
      ] : [
        // Light mode variables
        "[--background:0,0%,100%] [--foreground:0,0%,0%]",
        "[--muted:0,0%,96%] [--muted-foreground:0,0%,45%]",
        "[--border:0,0%,90%] [--input:0,0%,90%]",
        "[--primary:250,89%,68%] [--primary-foreground:0,0%,100%]",
        "[--primary-muted:257,36%,65%]"
      ],
      "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]",
      // Animation classes
      "transition-all duration-300 ease-out",
      showModal 
        ? "opacity-100 scale-100 translate-y-0" 
        : "opacity-0 scale-90 translate-y-4"
    )}
  >
    {/* Rest of your modal content remains the same */}
  </div>
);
  // Render as portal if parent is provided, otherwise full-page modal
  if (parent && parent.current) {
    return createPortal(
      <div 
        className={cn(
          "absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300",
          showModal ? "bg-opacity-30" : "bg-opacity-0"
        )}
      >
        {modalContent}
      </div>,
      parent.current
    );
  }

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300",
        showModal ? "bg-opacity-30" : "bg-opacity-0"
      )}
    >
      <div className="max-w-md w-full">{modalContent}</div>
    </div>
  );
}