import React from "react";

interface CircleScribbleProps {
  className?: string;
  color?: string;
}

const CircleScribble = ({
  className = "",
  color = "hsl(var(--marketing-accent))", // Updated to use marketing accent color
}: CircleScribbleProps) => {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 10C31.5 10 10 31.5 10 60C10 88.5 31.5 110 60 110C88.5 110 110 88.5 110 60C110 31.5 88.5 10 60 10Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="5 5"
      />
    </svg>
  );
};

export default CircleScribble;
