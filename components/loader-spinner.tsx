import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";

type LoaderSpinnerProps = {
  text?: string;
  className?: string;
  spinnerClassName?: string;
  size?: "sm" | "md" | "lg";
};

const LoaderSpinner = ({
  text = ``,
  spinnerClassName = ``,
  className = ``,
  size = "sm",
}: LoaderSpinnerProps) => {
  // return <span>{text ? text : "Loading..."}</span>;
  return (
    <div
      className={cn(
        `w-full h-full min-h-[40px] flex items-center justify-center`,
        className
      )}
    >
      <Spinner size={size} className={cn("bg-foreground", spinnerClassName)} />
    </div>
  );
};

export default LoaderSpinner;
