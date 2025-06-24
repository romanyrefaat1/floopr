"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[140px]" />
      </div>
      {/* Tabs bar skeleton */}
<div className="flex space-x-4 mb-6">
  <Skeleton className="h-8 w-24" />
  <Skeleton className="h-8 w-20" />
  <Skeleton className="h-8 w-20" />
  <Skeleton className="h-8 w-32" />
</div>

      <div className="grid grid-cols-[1fr,400px] gap-6">
        {/* Left config form */}
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-6">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview panel */}
        <div className="border rounded-lg p-4 sticky top-2 h-fit overflow-y-auto">
          <Skeleton className="h-6 w-[120px] mb-4" />
          <Skeleton className="rounded-lg border h-[400px] w-full" />
        </div>
      </div>
    </main>
  );
}
