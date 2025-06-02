"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type SizePreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeConfig = {
  xs: { svgSize: 36, defaultStrokeWidth: 3, textSizeClass: 'text-[9px]' },
  sm: { svgSize: 48, defaultStrokeWidth: 4, textSizeClass: 'text-xs' },
  md: { svgSize: 64, defaultStrokeWidth: 5, textSizeClass: 'text-sm' },
  lg: { svgSize: 96, defaultStrokeWidth: 8, textSizeClass: 'text-sm' },
  xl: { svgSize: 128, defaultStrokeWidth: 10, textSizeClass: 'text-base' },
};

// Helper function for numeric sizes (kept for flexibility)
const getCenterTextSizeClassForNumeric = (s: number) => {
  if (s < 60) return "text-xs";
  if (s < 120) return "text-sm";
  return "text-base";
};

export default function CircularProgress({
  value,
  feedback_count_monthly,
  limit,
  size: sizeInput = 'lg', // Accepts SizePreset or number, defaults to 'lg'
  strokeWidth: customStrokeWidth, // Optional custom stroke width override
}) {
  const [animatedValue, setAnimatedValue] = useState(0);

  let finalSvgSize: number;
  let finalDefaultStrokeWidth: number;
  let finalTextSizeClass: string;

  if (typeof sizeInput === 'string') {
    const config = sizeConfig[sizeInput];
    finalSvgSize = config.svgSize;
    finalDefaultStrokeWidth = config.defaultStrokeWidth;
    finalTextSizeClass = config.textSizeClass;
  } else { // sizeInput is a number
    finalSvgSize = sizeInput;
    finalDefaultStrokeWidth = Math.max(1, finalSvgSize / 12); // Proportional stroke width
    finalTextSizeClass = getCenterTextSizeClassForNumeric(finalSvgSize);
  }

  const finalStrokeWidth = customStrokeWidth ?? finalDefaultStrokeWidth;

  // Calculate radius to fit the circle within the finalSvgSize, maintaining a small padding
  // Padding on each side is roughly finalSvgSize / 24. So, available diameter for circle + stroke is finalSvgSize * (22/24) = finalSvgSize * (11/12)
  const radius = (finalSvgSize * (11 / 12) - finalStrokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  // Animate from 0 to value on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  // Determine color based on value
  const getColor = (val) => {
    if (val < 40) return "#22c55e"; // green
    if (val < 60) return "#eab308"; // yellow
    return "#ef4444"; // red
  };

  // Calculate the position of the progress end point
  const angle = (animatedValue / 100) * 360 - 90; // -90 to start from top

  const remaining = limit - feedback_count_monthly;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative inline-block cursor-pointer" style={{ width: finalSvgSize, height: finalSvgSize }}>
          <svg
            width={finalSvgSize}
            height={finalSvgSize}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#333" // neutral-200 or similar
              strokeWidth={finalStrokeWidth}
              fill="none"
            />
            
            {/* Progress circle */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={getColor(animatedValue)}
              strokeWidth={finalStrokeWidth}
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 bg-red-500 ease-out"
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className={`font-semibold text-foreground ${finalTextSizeClass} text-center`}>
              {Math.round(animatedValue)}%
            </span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" align="center" className="w-auto">
        <p className="text-sm">
          {remaining} feedback remaining
        </p>
        <p className="text-xs text-muted-foreground">
          ({feedback_count_monthly}/{limit} used)
        </p>
      </PopoverContent>
    </Popover>
  );
};
