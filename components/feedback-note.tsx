"use client";

import { cn } from "@/lib/utils";

interface FeedbackNoteProps {
  className?: string;
  content: string;
  title: string;
  positionX?: "left" | "right";
  positionY?: "top-24" | "bottom-24";
  rotation?: number;
  size?: "sm" | "md" | "lg";
}

export const FeedbackNote = ({
  className = "",
  content,
  title,
  positionX = "right",
  positionY = "top-24",
  size = "sm",
  rotation = 6,
}: FeedbackNoteProps) => {
  const sizeClasses = {
    sm: {
      container: "w-[180px] sm:w-[200px] md:w-[180px]",
      title: "text-sm sm:text-base",
      content: "text-xs sm:text-sm",
      bottomSquare: "w-4 h-4 sm:w-6 sm:h-6",
      line: "h-8 sm:h-12",
    },
    md: {
      container: "w-[220px] sm:w-[280px] md:w-[200px]",
      title: "text-base sm:text-lg",
      content: "text-xs sm:text-sm",
      bottomSquare: "w-6 h-6 sm:w-8 sm:h-8",
      line: "h-12 sm:h-16",
    },
    lg: {
      container: "w-[260px] sm:w-[340px] md:w-[400px]",
      title: "text-lg sm:text-xl",
      content: "text-sm sm:text-base",
      bottomSquare: "w-8 h-8 sm:w-10 sm:h-10",
      line: "h-16 sm:h-20",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      className={cn(
        "absolute",
        // Responsive positioning
        positionX === "right" ? "right-2 sm:right-4" : "left-2 sm:left-4",
        // Responsive vertical positioning
        {
          "top-16 sm:top-24": positionY === "top-24",
          "bottom-16 sm:bottom-24": positionY === "bottom-24",
        },
        currentSize.container,
        // Hide on very small screens if needed
        "hidden sm:block",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative">
        {/* Top Box */}
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <div className={cn("font-semibold text-gray-800", currentSize.title)}>
            {title}
          </div>
          <p className={cn("text-gray-600 mt-1 sm:mt-2", currentSize.content)}>
            {content}
          </p>
        </div>

        {/* Curved Line */}
        <div
          className={cn(
            "absolute left-1/2 w-0.5 bg-gradient-to-b from-gray-300 to-transparent transform -translate-x-1/2",
            currentSize.line,
            "-bottom-[calc(theme(spacing.12)+theme(spacing.4))] sm:-bottom-[calc(theme(spacing.16)+theme(spacing.8))]",
            "before:content-[''] before:absolute before:bottom-0 before:right-0 before:w-6 before:h-6 sm:before:w-8 sm:before:h-8 before:border-b-2 before:border-r-2 before:border-gray-300 before:rounded-br-xl"
          )}
        />

        {/* Bottom Square */}
        <div
          className={cn(
            "absolute left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-sm border border-gray-200",
            currentSize.bottomSquare,
            "-bottom-[calc(theme(spacing.16)+theme(spacing.4))] sm:-bottom-[calc(theme(spacing.24)+theme(spacing.4))]"
          )}
        />
      </div>
    </div>
  );
};
