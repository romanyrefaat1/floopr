"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-start justify-center pt-20 p-4">
      <Card className="w-full max-w-xl p-8">
        <div className="space-y-8">
          {/* Progress indicator */}
          <div className="flex justify-center space-x-4">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-2 w-2 rounded-full" />
          </div>

          {/* Content container */}
          <div className="relative min-h-[250px]">
            {/* Title skeleton */}
            <Skeleton className="h-8 w-3/4 mx-auto mb-4" />

            {/* Description skeleton */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-6" />

            {/* Input / textarea skeleton */}
            <Skeleton className="h-12 w-full mb-6 rounded-md" />

            {/* Button skeletons */}
            <div className="flex justify-between">
              <Skeleton className="h-10 w-24 rounded" />
              <Skeleton className="h-10 w-32 rounded" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
