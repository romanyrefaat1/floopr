"use client";

import {
  addSimpleFeedback,
  SimpleFeedbackItemData,
} from "@/actions/add-feedback";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { serverTimestamp } from "firebase/firestore";
import {
  ArrowLeft,
  BugIcon,
  Lightbulb,
  LightbulbIcon,
  LucideLightbulb,
  Sparkles,
  Stars,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type PaddingSize = "sm" | "md" | "lg" | "xl";
type BorderRadiusSize = "sm" | "md" | "lg" | "xl";
type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const paddingSizes = {
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
};

const borderRadiusSizes = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
};

interface FeedbackTypeConfig {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

interface FeedbackTypeColors {
  feature?: {
    main: string;
    glow: string;
  };
  idea?: {
    main: string;
    glow: string;
  };
  bug?: {
    main: string;
    glow: string;
  };
  other?: {
    main: string;
    glow: string;
  };
}

interface FloatingFeedbackButtonProps {
  isModal?: boolean;
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  overlayColor?: string;
  accentColor?: string;
  borderColor?: string;
  padding?: PaddingSize;
  borderRadius?: BorderRadiusSize;
  feedbackTypeColors?: FeedbackTypeColors;
  isSecondSectionColorLikeFeatureType?: boolean;
  username?: string;
  userId?: string;
  userImage?: string | undefined; // Changed from string | null
  position?: Position;
  componentId: string;
  productId: string;
}

export default function FloatingFeedbackButton({
  isModal = false,
  primaryColor = "hsl(var(--primary))",
  backgroundColor = "hsl(var(--background))",
  // textColor = "hsl(var(--foreground))",
textColor = "#000",
  overlayColor = "rgb(0 0 0 / 0.5)",
  accentColor = "hsl(var(--accent))",
  borderColor = "hsl(var(--border))",
  padding = "md",
  borderRadius = "xl",
  feedbackTypeColors = {},
  isSecondSectionColorLikeFeatureType = true,
  username = "Anonymous user",
  userId = "anonymous",
  userImage = undefined,
  position = "bottom-right",
  componentId,
  productId,
}: FloatingFeedbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isContentAnimating, setIsContentAnimating] = useState(false);
  const [isButtonMounted, setIsButtonMounted] = useState(false);

  // Handle initial mount animation
  useEffect(() => {
    if (isOpen) {
      setIsMounted(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsMounted(true);
        });
      });
    }
  }, [isOpen]);

  // Handle button mount animation
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsButtonMounted(true);
    });
  }, []);

  const defaultColors = {
    feature: {
      main: "#3b82f6",
      glow: "rgba(59, 130, 246, 0.35)",
    },
    idea: {
      main: "#f59e0b",
      glow: "rgba(245, 158, 11, 0.35)",
    },
    bug: {
      main: "#ef4444",
      glow: "rgba(239, 68, 68, 0.35)",
    },
    other: {
      main: "#8b5cf6",
      glow: "rgba(139, 92, 246, 0.35)",
    },
  };

  const getTypeColors = (type: keyof FeedbackTypeColors) => {
    return feedbackTypeColors[type] || defaultColors[type];
  };

  const feedbackTypes: FeedbackTypeConfig[] = [
    {
      label: "Feature",
      value: "feature",
      icon: <Sparkles className="h-5 w-5" />,
      color: getTypeColors("feature").main,
      glowColor: getTypeColors("feature").glow,
    },
    {
      label: "Idea",
      value: "idea",
      icon: <LightbulbIcon className="h-5 w-5" />,
      color: getTypeColors("idea").main,
      glowColor: getTypeColors("idea").glow,
    },
    {
      label: "Bug",
      value: "issue",
      icon: <BugIcon className="h-5 w-5" />,
      color: getTypeColors("bug").main,
      glowColor: getTypeColors("bug").glow,
    },
    {
      label: "Other",
      value: "other",
      icon: <Stars className="h-5 w-5" />,
      color: getTypeColors("other").main,
      glowColor: getTypeColors("other").glow,
    },
  ];

  const getCurrentTypeColors = () => {
    if (!selectedType) return null;
    const typeConfig = feedbackTypes.find((t) => t.value === selectedType);
    return typeConfig
      ? { main: typeConfig.color, glow: typeConfig.glowColor }
      : null;
  };

  const getSecondSectionStyles = () => {
    if (!selectedType) return {};

    const currentTypeColors = getCurrentTypeColors();
    if (!currentTypeColors) return {};

    const colors = isSecondSectionColorLikeFeatureType
      ? getTypeColors("feature")
      : currentTypeColors;

    return {
      "--input-border-color": colors.main,
      "--input-focus-glow": colors.glow,
      "--button-bg": colors.main,
      "--button-glow": colors.glow,
      "--section-bg": colors.glow,
      "--section-border": colors.main,
    };
  };

  const handleSubmit = async () => {
    if (!title || !description || !selectedType) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const feedbackData: SimpleFeedbackItemData = {
        feedback: {
          title,
          content: description,
          isRich: false,
          type: selectedType as "feature" | "idea" | "issue" | "other",
        },
        productId,
        userInfo: {
          username,
          userId,
          profilePicture: userImage,
        },
      };

      const result = await addSimpleFeedback(feedbackData);
      if (result.success) {
        toast.success("Feedback submitted successfully");
        handleClose();
      }
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
  };

  const handleClose = () => {
    setIsModalAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
      setSelectedType(null);
      setTitle("");
      setDescription("");
      setIsModalAnimating(false);
      setIsMounted(false);
    }, 200);
  };

  const handleBack = () => {
    setIsContentAnimating(true);
    setTimeout(() => {
      setSelectedType(null);
      setIsContentAnimating(false);
    }, 200);
  };

  const handleTypeSelect = (type: string) => {
    setIsContentAnimating(true);
    setTimeout(() => {
      setSelectedType(type);
      setIsContentAnimating(false);
    }, 200);
  };

  const getPositionStyles = () => {
    switch (position) {
      case "top-left":
        return { top: "1rem", left: "1rem" };
      case "top-right":
        return { top: "1rem", right: "1rem" };
      case "bottom-left":
        return { bottom: "1rem", left: "1rem" };
      case "bottom-right":
        return { bottom: "1rem", right: "1rem" };
      default:
        return {};
    }
  };

  const getPopupPositionStyles = () => {
    switch (position) {
      case "top-left":
        return { left: "0", top: "100%", marginTop: "1rem" };
      case "top-right":
        return { right: "0", top: "100%", marginTop: "1rem" };
      case "bottom-left":
        return { left: "0", bottom: "100%", marginBottom: "1rem" };
      case "bottom-right":
        return { right: "0", bottom: "100%", marginBottom: "1rem" };
      default:
        return { right: "0", bottom: "100%", marginBottom: "1rem" };
    }
  };

  return (
    <div className="fixed z-50 min-h-fit" style={getPositionStyles()}>
      {/* Circular Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "group h-14 w-14 shadow-lg",
          "transition-all duration-300 ease-in-out",
          "hover:scale-110 hover:shadow-xl",
          "active:scale-95",
          "relative overflow-hidden",
          "opacity-0 translate-y-4",
          isButtonMounted && "opacity-100 translate-y-0",
          "before:absolute before:inset-0 before:bg-white/20 before:opacity-0 before:transition-opacity",
          "hover:before:opacity- flex items-center justify-center"
        )}
        style={{
          backgroundColor: primaryColor,
          borderRadius: "9999px", // Keep the button always circular
        }}
      >
        <span
          className="relative z-10 transition-transform duration-300 group-hover:-translate-y-px flex items-center justify-center"
          style={{ color: backgroundColor }}
        >
          <LightbulbIcon
            className="font-bold border-0"
            fill={backgroundColor}
            size={28}
          />
        </span>
      </button>

      {/* Popup/Modal */}
      {isOpen && (
        <div
          className={cn(
            "transition-all duration-200",
            isModal
              ? [
                  "fixed inset-0 flex items-center justify-center",
                  isModalAnimating ? "opacity-0" : "opacity-0",
                  isMounted && "opacity-100",
                ]
              : [
                  "absolute",
                  isModalAnimating
                    ? "opacity-0 translate-y-4"
                    : "opacity-0 translate-y-4",
                  isMounted && "opacity-100 translate-y-0",
                ]
          )}
          style={{
            backgroundColor: isModal ? overlayColor : "transparent",
            ...getPopupPositionStyles(),
          }}
        >
          <div
            className={cn(
              "relative transition-all duration-200",
              isModal
                ? [
                    "max-w-md w-full mx-4",
                    isModalAnimating
                      ? "scale-95 opacity-0"
                      : "scale-95 opacity-0",
                    isMounted && "scale-100 opacity-100",
                  ]
                : [
                    "w-[320px] shadow-lg",
                    isModalAnimating
                      ? "scale-95 opacity-0"
                      : "scale-95 opacity-0",
                    isMounted && "scale-100 opacity-100",
                  ]
            )}
            style={{
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: "1px",
              color: textColor,
              padding: paddingSizes[padding],
              borderRadius: borderRadiusSizes[borderRadius],
            }}
          >
            {/* Header with back/close button */}
            <div className="flex items-center justify-between mb-6">
              {selectedType ? (
                <button
                  onClick={handleBack}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  style={{ color: textColor }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : (
                <div className="w-4" />
              )}
              <div className="flex items-center gap-2 flex-">
                {selectedType && (
                  <div
                    className="p-1 rounded-md"
                    style={{
                      color: feedbackTypes.find((t) => t.value === selectedType)
                        ?.color,
                      backgroundColor: feedbackTypes.find(
                        (t) => t.value === selectedType
                      )?.glowColor,
                      boxShadow: `0 0 12px ${
                        feedbackTypes.find((t) => t.value === selectedType)
                          ?.glowColor
                      }`,
                    }}
                  >
                    {feedbackTypes.find((t) => t.value === selectedType)?.icon}
                  </div>
                )}
                <h2
                  className="text-2xl font-bold text-center flex-"
                  style={{ color: textColor }}
                >
                  {selectedType
                    ? feedbackTypes.find((t) => t.value === selectedType)?.label
                    : "Give us feedback"}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
                style={{ color: textColor }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Main content with animations */}
            <div className="relative min-h-[200px]">
              <div
                className={cn(
                  "absolute inset-0",
                  "transition-all duration-200 ease-in-out",
                  isContentAnimating
                    ? "opacity-0 translate-y-2"
                    : "opacity-100 translate-y-0"
                )}
              >
                {!selectedType ? (
                  <div className="space-y-3">
                    {feedbackTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handleTypeSelect(type.value)}
                        className={cn(
                          "w-full p-2 rounded-lg border transition-all duration-300",
                          "hover:scale-[1.02] active:scale-[0.98]",
                          "flex items-center gap-3",
                          "group relative overflow-hidden"
                        )}
                        style={{
                          borderColor: type.color,
                          color: textColor,
                          backgroundColor: "transparent",
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                          style={{ backgroundColor: type.color }}
                        />
                        <div
                          className="relative p-2 rounded-md transition-all duration-300 group-hover:scale-110"
                          style={{
                            color: type.color,
                            backgroundColor: `${type.glowColor}`,
                            boxShadow: `0 0 12px ${type.glowColor}`,
                          }}
                        >
                          {type.icon}
                        </div>
                        <span className="font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border bg-transparent transition-all duration-300 focus:border-2"
                        style={{
                          color: textColor,
                          borderRadius: borderRadiusSizes[borderRadius],
                        }}
                      />
                    </div>
                    <textarea
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border bg-transparent min-h-[100px] transition-all duration-300 focus:border-2"
                      style={{
                        color: textColor,
                        borderRadius: borderRadiusSizes[borderRadius],
                      }}
                    />
                    <Button
                      onClick={handleSubmit}
                      className={cn(
                        "w-full transition-all duration-300",
                        "hover:shadow-lg hover:brightness-110",
                        "active:scale-[0.98]"
                      )}
                      style={{
                        color: "white",
                        borderRadius: borderRadiusSizes[borderRadius],
                      }}
                    >
                      {selectedType && (
                        <span className="mr-2">
                          {
                            feedbackTypes.find((t) => t.value === selectedType)
                              ?.icon
                          }
                        </span>
                      )}
                      Send feedback
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Logo */}
            <div className="mt-6 flex justify-center items-center text-sm text-muted-foreground">
              <span className="mr-2" style={{ color: textColor }}>
                Made by
              </span>
              <Image
                src="/floopr-logo-no-bg-svg.svg"
                alt="Floopr logo"
                width={42}
                height={12}
                className="dark:hidden"
              />
              <Image
                src="/floopr-logo-no-bg-white-svg.svg"
                alt="Floopr logo"
                width={42}
                height={12}
                className="hidden dark:block"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
