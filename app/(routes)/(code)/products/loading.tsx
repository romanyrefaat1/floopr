// app/products/loading.tsx
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SKELETON_COUNT = 4

export default function Loading() {
  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-2xl p-6 flex flex-col justify-between"
        >
          <div>
            {/* Avatar + Title */}
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-28 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}
