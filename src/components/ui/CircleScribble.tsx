"use client";

const CircleScribble = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M30,10 Q50,5 70,20 Q90,40 80,70 Q70,90 40,85 Q10,80 10,50 Q10,20 30,10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        className="text-floopr-purple"
      />
    </svg>
  );
};

export default CircleScribble;
