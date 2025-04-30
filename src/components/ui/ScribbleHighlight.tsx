"use client";

const ScribbleHighlight = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <div className="absolute -bottom-2 left-0 w-full h-4 bg-floopr-purple opacity-20 -rotate-1 rounded-full"></div>
    </span>
  );
};

export default ScribbleHighlight;
