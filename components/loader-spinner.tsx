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
    // <div className="container mx-auto py-10 max-w-7xl">
    //   <div className="flex items-center justify-center">
    //     <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    //   </div>
    // </div>
  );
};

export default LoaderSpinner;
