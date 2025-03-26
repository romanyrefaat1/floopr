import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SkeletonCardProps = {
  dir?: `hor` | `ver`;
};

export function SkeletonCard({ dir = `hor` }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "flex flex-row space-y-3  border border-secondaryBackground p-4 rounded-md gap-4",
        dir === `ver` && `flex-col`
      )}
    >
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-10 w-[400px]" />
        <Skeleton className="h-5 w-[200px]" />
      </div>
    </div>
  );
}
