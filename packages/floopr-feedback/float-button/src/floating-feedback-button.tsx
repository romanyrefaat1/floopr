"use client";

import {
  ArrowLeft,
  BugIcon,
  LightbulbIcon,
  Sparkles,
  Stars,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

type PaddingSize = "sm" | "md" | "lg" | "xl";
type BorderRadiusSize = "sm" | "md" | "lg" | "xl";
type ButtonPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

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

interface ComponentData {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  overlayColor?: string;
  accentColor?: string;
  borderColor?: string;
  padding?: PaddingSize;
  borderRadius?: BorderRadiusSize;
  position?: ButtonPosition;
  isSecondSectionColorLikeFeatureType?: boolean;
  feedbackTypeColors?: FeedbackTypeColors;
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
  userImage?: string | null;
  buttonPosition?: ButtonPosition;
  componentId: string;
  productId: string;
  apiKey: string | null;
  isFixed?: boolean;
}

const baseUrl = `https://www.floopr.app`;
// const baseUrl = `http://localhost:3000`;

// Utility to check if a color is dark
function isColorDark(color: string): boolean {
  let r = 255,
    g = 255,
    b = 255;
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  } else if (color.startsWith("rgb")) {
    const rgb = color.match(/\d+/g);
    if (rgb) {
      r = parseInt(rgb[0]);
      g = parseInt(rgb[1]);
      b = parseInt(rgb[2]);
    }
  }
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
}

// Add a local cn utility if not present
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// Add a local Button component if not present
function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "px-4 py-2 rounded transition-colors duration-200",
        props.className
      )}
    >
      {children}
    </button>
  );
}

const getPositionStyles = (
  buttonPosition: ButtonPosition,
  isFixed: boolean
) => {
  const cssPosition: "fixed" | "absolute" = isFixed ? "fixed" : "absolute";
  switch (buttonPosition) {
    case "top-left":
      return { top: "1rem", left: "1rem", position: cssPosition };
    case "top-right":
      return { top: "1rem", right: "1rem", position: cssPosition };
    case "bottom-left":
      return { bottom: "2rem", left: "1.5rem", position: cssPosition };
    case "bottom-right":
      return { bottom: "2rem", right: "1.5rem", position: cssPosition };
    default:
      return { position: cssPosition };
  }
};

const getPopupPositionStyles = (buttonPosition: ButtonPosition) => {
  switch (buttonPosition) {
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

export default function FlooprFloatingFeedbackButton({
  isModal = false,
  primaryColor = "#7D65F6",
  backgroundColor = "#ffffff",
  textColor = "#000",
  overlayColor = "rgb(0 0 0 / 0.5)",
  accentColor = "hsl(var(--accent))",
  borderColor = "#333",
  padding = "md",
  borderRadius = "xl",
  feedbackTypeColors = {},
  isSecondSectionColorLikeFeatureType = true,
  username = "Anonymous user",
  userId = "anonymous",
  userImage = null,
  buttonPosition = "bottom-right",
  componentId,
  productId,
  apiKey = null,
  isFixed = true,
}: FloatingFeedbackButtonProps) {
  if (!componentId || !apiKey || !productId) {
    console.warn("Missing required Floopr props—won't render");
    toast.error(`Error: Component Id, Product Id, or API KEY is Invalid`);
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isContentAnimating, setIsContentAnimating] = useState(false);
  const [isButtonMounted, setIsButtonMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);
  const [configData, setConfigData] = useState<any>(null);
  const [isSubmittin, setIsSubmittin] = useState(false);
  const [componentReady, setComponentReady] = useState(false); // New state to control component mounting
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  // Validate API key, productId, and componentId, then fetch config
  useEffect(() => {
    async function fetchConfig() {
      setConfigLoading(true);
      setConfigError(null);
      try {
        const res = await fetch(
          `${baseUrl}/api/imports/components/load-component?apiKey=${apiKey}&productId=${productId}&componentId=${componentId}`
        );
        if (!res.ok) throw new Error("Invalid API key or component info");
        const data = await res.json();
        setConfigData(data);
        // Only set component as ready after successful data fetch
        setComponentReady(true);
      } catch (err: any) {
        setConfigError(err.message || "Failed to load config");
        // Don't set componentReady to true on error
      } finally {
        setConfigLoading(false);
      }
    }
    fetchConfig();
  }, [apiKey, productId, componentId]);

  // Handle button mount animation - only after config is loaded
  useEffect(() => {
    if (componentReady && configData) {
      // Small delay to ensure the animation is visible
      const timer = setTimeout(() => {
        setIsButtonMounted(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [componentReady, configData]);

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

  // Show loading state
  if (configLoading || !componentReady) {
    return (
      <div
        className={cn("absolute z-50 min-h-fit opacity-0", isFixed && `fixed`)}
        style={getPositionStyles(buttonPosition, isFixed)}
      >
        {/* Optional: Show a subtle loading indicator */}
        <div className="p-2 bg-gray-100 rounded-full shadow animate-pulse">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (configError) {
    return (
      <div
        className={cn("absolute z-50 min-h-fit", isFixed && `fixed`)}
        style={getPositionStyles(buttonPosition, isFixed)}
      >
        <div className="p-4 bg-red-100 text-red-700 rounded shadow text-sm max-w-xs">
          Failed to load component: {configError}
        </div>
      </div>
    );
  }

  // Don't render the main component until config is ready
  if (!configData) {
    return null;
  }

  // Extract configuration from configData or use default props
  const finalConfig = {
    isModal: configData?.isModal ?? isModal,
    primaryColor: configData?.primaryColor ?? primaryColor,
    backgroundColor: configData?.backgroundColor ?? backgroundColor,
    textColor: configData?.textColor ?? textColor,
    overlayColor: configData?.overlayColor ?? overlayColor,
    accentColor: configData?.accentColor ?? accentColor,
    borderColor: configData?.borderColor ?? borderColor,
    padding: (configData?.padding as PaddingSize) ?? padding,
    borderRadius:
      (configData?.borderRadius as BorderRadiusSize) ?? borderRadius,
    feedbackTypeColors: configData?.feedbackTypeColors ?? feedbackTypeColors,
    isSecondSectionColorLikeFeatureType:
      configData?.isSecondSectionColorLikeFeatureType ??
      isSecondSectionColorLikeFeatureType,
    buttonPosition: (configData?.position as ButtonPosition)
      ? configData?.position
      : buttonPosition,
  };

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
    return finalConfig.feedbackTypeColors[type] || defaultColors[type];
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

  // Updated getSecondSectionStyles to use finalConfig
  const getSecondSectionStyles = () => {
    if (!selectedType) return {};

    const currentTypeColors = getCurrentTypeColors();
    if (!currentTypeColors) return {};

    // Determine if we should use feature type colors or current type colors
    let colorsToUse;
    if (
      finalConfig.isSecondSectionColorLikeFeatureType &&
      selectedType &&
      selectedType !== "feature"
    ) {
      // If isSecondSectionColorLikeFeatureType is true, and current type is not feature,
      // use feature type colors for the second section.
      colorsToUse = getTypeColors("feature");
    } else {
      // Otherwise, use the colors of the currently selected type.
      colorsToUse = currentTypeColors;
    }

    // Fallback if colorsToUse is somehow not defined (e.g. feature type colors missing)
    if (!colorsToUse) {
      colorsToUse = currentTypeColors || {
        main: finalConfig.primaryColor,
        glow: finalConfig.accentColor,
      }; // Basic fallback
    }

    return {
      "--input-border-color": colorsToUse.main,
      "--input-focus-glow": colorsToUse.glow,
      "--button-bg": colorsToUse.main, // Button background uses the main color
      "--button-text-color": isColorDark(colorsToUse.main) ? "#FFF" : "#000", // Dynamic text color for button
      "--button-glow": colorsToUse.glow,
      "--section-bg": colorsToUse.glow, // Section background uses glow for subtlety
      "--section-border": colorsToUse.main,
    };
  };

  const handleSubmit = async () => {
    setIsSubmittin(true);
    if (!title || !description || !selectedType) {
      toast.error("Please fill in all fields");
      setIsSubmittin(false);
      return;
    }

    try {
      const feedbackData = {
        feedback: {
          title,
          content: description,
          isRich: false,
          type: selectedType as "feature" | "idea" | "issue" | "other",
        },
        productId,
        componentId,
        componentRefId: componentId,
        isComponent: true,
        componentType: "floating-button",
        userInfo: {
          username,
          userId,
          profilePicture: userImage ?? null,
        },
      };

      const res = await fetch(
        `${baseUrl}/api/imports/components/save-simple-data`,
      {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feedbackData),
        }
      );
      const result = await res.json();

      if (result.success) {
        setIsSubmitted(true);
        setIsSubmittin(false);
        textareaRef.current.value = ``;
        inputRef.current.value = ``;
        setTitle("");
        setDescription("");
        toast.success("Thanks for your feedback!", {
          description: "We appreciate your input and will review it soon.",
          duration: 3000,
        });
        setTimeout(() => {
          setIsSubmitted(false);
          handleClose();
        }, 500);
        return;
      } else {
        setIsSubmittin(false);
        toast.error("Failed to submit feedback", {
          description: result.error || "Please try again later.",
          duration: 3000,
        });
      }
    } catch (error) {
      setIsSubmittin(false);
      toast.error("Failed to submit feedback", {
        description: "An unexpected error occurred. Please try again later.",
        duration: 3000,
      });
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

  function flattenClasses(...args: any[]): any[] {
    return args.flat(Infinity);
  }

  return (
    <div
      className={cn(
        ...flattenClasses("absolute z-50 min-h-fit", isFixed && `fixed`)
      )}
      style={getPositionStyles(finalConfig.buttonPosition, isFixed)}
    >
      {/* Circular Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "group h-14 w-14 shadow-lg",
          "transition-all duration-500 ease-out",
          "hover:scale-110 hover:shadow-xl",
          "active:scale-95",
          "relative overflow-hidden",
          "opacity-0 translate-y-4",
          isButtonMounted && "opacity-100 translate-y-0",
          "before:absolute before:inset-0 before:bg-white/20 before:opacity-0 before:transition-opacity",
          "hover:before:opacity-100 flex items-center justify-center"
        )}
        style={{
          backgroundColor: finalConfig.primaryColor,
          borderRadius: "9999px", // Keep the button always circular
          transform: isButtonMounted ? "translateY(0)" : "translateY(1rem)",
          opacity: isButtonMounted ? 1 : 0,
        }}
      >
        <span
          className="relative z-10 transition-transform duration-300 group-hover:-translate-y-px flex items-center justify-center"
          style={{ color: finalConfig.backgroundColor }}
        >
          <LightbulbIcon
            className="font-bold border-0"
            fill={finalConfig.backgroundColor}
            size={28}
          />
        </span>
      </button>

      {/* Popup/Modal */}
      {isOpen && (
        <div
          className={cn(
            ...flattenClasses(
              "transition-all duration-200",
              finalConfig.isModal
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
            )
          )}
          style={{
            backgroundColor: finalConfig.isModal
              ? finalConfig.overlayColor
              : "transparent",
            ...getPopupPositionStyles(finalConfig.buttonPosition),
          }}
        >
          <div
            className={cn(
              ...flattenClasses(
                "relative transition-all duration-200",
                finalConfig.isModal
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
              )
            )}
            style={{
              backgroundColor: finalConfig.backgroundColor,
              borderColor: finalConfig.primaryColor || finalConfig.borderColor,
              borderWidth: ".7px",
              color: finalConfig.textColor,
              padding: paddingSizes[finalConfig.padding as PaddingSize],
              borderRadius:
                borderRadiusSizes[finalConfig.borderRadius as BorderRadiusSize],
            }}
          >
            {/* Header with back/close button */}
            <div className="flex items-center justify-between mb-6">
              {selectedType ? (
                <button
                  onClick={handleBack}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  style={{ color: finalConfig.textColor }}
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
                  style={{ color: finalConfig.textColor }}
                >
                  {selectedType
                    ? feedbackTypes.find((t) => t.value === selectedType)?.label
                    : "Give us feedback"}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
                style={{ color: finalConfig.textColor }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Main content with animations */}
            <div className="relative min-h-[200px] mb-[60px]">
              <div
                className={cn(
                  ...flattenClasses(
                    "absolute inset-0",
                    "transition-all duration-200 ease-in-out",
                    isContentAnimating
                      ? "opacity-0 translate-y-2"
                      : "opacity-100 translate-y-0"
                  )
                )}
              >
                {!selectedType ? (
                  <div className="space-y-3">
                    {feedbackTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handleTypeSelect(type.value)}
                        className={cn(
                          ...flattenClasses(
                            "w-full p-2 rounded-lg border transition-all duration-300",
                            "hover:scale-[1.02] active:scale-[0.98]",
                            "flex items-center gap-3",
                            "group relative overflow-hidden"
                          )
                        )}
                        style={{
                          borderColor: type.color,
                          color: finalConfig.textColor,
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
                    <div className="flex items-center gap-1 mb-4">
                      <input
                        type="text"
                        ref={inputRef}
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={cn(
                          ...flattenClasses(
                            "w-full p-2 border bg-transparent transition-all duration-300 focus:border-2"
                          )
                        )}
                        style={{
                          color: finalConfig.textColor,
                          borderRadius:
                            borderRadiusSizes[
                              finalConfig.borderRadius as BorderRadiusSize
                            ],
                        }}
                      />
                    </div>
                    <textarea
                      placeholder="Description"
                      value={description}
                      ref={textareaRef}
                      onChange={(e) => setDescription(e.target.value)}
                      className={cn(
                        ...flattenClasses(
                          "w-full p-2 border bg-transparent min-h-[100px] transition-all duration-300 focus:border-2"
                        )
                      )}
                      style={{
                        color: finalConfig.textColor,
                        borderRadius:
                          borderRadiusSizes[
                            finalConfig.borderRadius as BorderRadiusSize
                          ],
                      }}
                    />
                    <div className="flex justify-center items-center mt-2">
                      <Button
                        disabled={isSubmittin}
                        onClick={handleSubmit}
                        style={{
                          width: `fit-content`,

                          borderRadius:
                            borderRadiusSizes[
                              finalConfig.borderRadius as BorderRadiusSize
                            ],
                          backgroundColor: selectedType
                            ? feedbackTypes.find(
                                (t) => t.value === selectedType
                              )?.color
                            : finalConfig.primaryColor,
                          color: selectedType
                            ? getSecondSectionStyles()["--button-text-color"]
                            : isColorDark(finalConfig.primaryColor)
                            ? "#FFF"
                            : "#000",
                          boxShadow: selectedType
                            ? `0 0 12px ${
                                getSecondSectionStyles()["--button-glow"]
                              }`
                            : "none",
                        }}
                        className={cn(
                          ...flattenClasses(
                            "w-full transition-all duration-300",
                            "hover:scale-[1.02] hover:shadow-lg hover:brightness-110",
                            "active:scale-[0.98] disabled:scale-[1]",
                            "group relative overflow-hidden"
                          )
                          // isSubmittin && `opacity-40 bg-green-500`
                        )}
                      >
                        <div
                          style={{
                            backgroundColor: selectedType
                              ? feedbackTypes.find(
                                  (t) => t.value === selectedType
                                )?.color
                              : finalConfig.primaryColor,
                          }}
                          className={cn(
                            "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 w-fit"
                            // isSubmittin && `opacity-40 bg-blue-500`
                          )}
                        />
                        {isSubmitted ? (
                          <span
                            className={cn(
                              ...flattenClasses(
                                "flex items-center justify-center w-full relative z-10"
                              )
                            )}
                          >
                            <Stars className="mr-2 h-5 w-5" />
                            Thanks for your feedback
                          </span>
                        ) : (
                          <div
                            className={cn(
                              "flex gap-2 justify-center py-1 w-fit"
                              // isSubmittin && `opacity-40 bg-red-500`
                            )}
                          >
                            {selectedType && (
                              <span
                                className="mr-2 flex items-center justify-center relative z-10"
                                style={{
                                  color: finalConfig.textColor,
                                  // backgroundColor: finalConfig.primaryColor,
                                }}
                              >
                                {
                                  feedbackTypes.find(
                                    (t) => t.value === selectedType
                                  )?.icon
                                }
                              </span>
                            )}
                            <span className="relative z-10">
                              {!isSubmittin ? `Send` : `Sending`}{" "}
                              {feedbackTypes.find(
                                (t) => t.value === selectedType
                              )?.label !== `Other`
                                ? feedbackTypes.find(
                                    (t) => t.value === selectedType
                                  )?.label
                                : `Feedback`}
                            </span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Logo */}
            <div
              className="mt-6 flex justify-end items-center text-sm text-muted-foreground"
              style={{ scale: 0.9 }}
            >
              <span
                className="mr-2 leading-tight"
                style={{ color: finalConfig.textColor }}
              >
                We run on
              </span>
              <a
                href="https://www.floopr.app?ref=${current-pa}"
                target="_blank"
                rel="noopener noreferrer"
              >
                {isColorDark(finalConfig.backgroundColor) ? (
                  <img
                    src={`https://floopr.vercel.app/images/floopr-logo-no-bg-white-svg.svg`}
                    alt="Floopr logo"
                    width={42}
                    height={12}
                    style={{ display: "inline-block" }}
                  />
                ) : (
                  <img
                    src={`https://floopr.vercel.app/images/floopr-logo-no-bg-svg.svg`}
                    alt="Floopr logo"
                    width={42}
                    height={12}
                    style={{ display: "inline-block" }}
                  />
                )}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
