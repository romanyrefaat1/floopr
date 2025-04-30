"use client";

const DoobleArrow = ({
  className = "",
  direction = "right",
}: {
  className?: string;
  direction?: "left" | "right";
}) => {
  const transform = direction === "left" ? "scale(-1, 1)" : "";

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform }}
    >
      <path
        d="M5,25 Q15,10 25,30 Q35,50 45,25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        className="text-floopr-purple/30"
      />
      <circle cx="45" cy="25" r="3" className="fill-floopr-purple/30" />
    </svg>
  );
};

export default DoobleArrow;
