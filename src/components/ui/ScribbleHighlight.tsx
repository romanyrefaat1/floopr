
import React from 'react';

interface ScribbleHighlightProps {
  children: React.ReactNode;
  color?: string;
}

const ScribbleHighlight = ({ children, color = "#7C65F6" }: ScribbleHighlightProps) => {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        className="absolute -bottom-1 left-0 w-full h-3 -z-10"
        viewBox="0 0 150 10"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 5.5C28.8333 2.66667 65.3 -0.6 95.5 5C125.7 10.6 144.167 8.5 149 6.5"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
};

export default ScribbleHighlight;
