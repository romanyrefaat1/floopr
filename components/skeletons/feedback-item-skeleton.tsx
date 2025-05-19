// components/feedback/[productId]/_components/FeedbackItemSkeleton.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

export default function FeedbackItemSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border rounded-xl p-4 bg-secondaryBackground text-foreground animate-pulse",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="w-24 h-6" /> {/* Topic / component badge */}
        <Skeleton className="w-6 h-6 rounded-full" />{" "}
        {/* Delete icon placeholder */}
      </div>
      <div className="flex mb-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="w-3/4 h-6" /> {/* Title */}
          <Skeleton className="w-full h-4" /> {/* Content line 1 */}
          <Skeleton className="w-5/6 h-4" /> {/* Content line 2 */}
        </div>
        <div className="w-12 flex-shrink-0 flex items-center justify-center">
          <Skeleton className="w-8 h-8 rounded-full" />{" "}
          {/* Like button placeholder */}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-6 h-6 rounded-full" /> {/* Avatar */}
          <Skeleton className="w-20 h-4" /> {/* Username & time */}
        </div>
        <div className="flex space-x-2">
          <Skeleton className="w-12 h-5 rounded" /> {/* Status badge */}
          <Skeleton className="w-12 h-5 rounded" /> {/* Type badge */}
          <Skeleton className="w-12 h-5 rounded" /> {/* Topic badge */}
        </div>
      </div>
    </div>
  );
}
