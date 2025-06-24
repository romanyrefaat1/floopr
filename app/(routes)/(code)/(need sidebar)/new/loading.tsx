// app/products/onboarding/loading.tsx
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Card */}
      <div className="w-full max-w-md border border-gray-200 rounded-2xl p-6 space-y-6">
        {/* Back arrow + Step info */}
        <div className="flex items-center justify-between">
          <Skeleton className="w-6 h-6" /> {/* back arrow placeholder */}
          <Skeleton className='w-16 h-4' />
          <div className="flex space-x-2 items-center">
            <Skeleton className="w-16 h-4" /> {/* “Step 1 of 4” */}
            <Skeleton className="w-8 h-4" />  {/* “25%” */}
          </div>
        </div>

        {/* Progress bar */}
        <Skeleton className="w-full h-2 rounded-full" />

        {/* Title & subtitle */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />  {/* “What's your product's name?” */}
          <Skeleton className="h-4 w-1/2" />  {/* subtext */}
        </div>

        {/* Input field */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-1/3" />   {/* “Product Name” label */}
          <Skeleton className="h-10 w-full rounded" /> {/* input box */}
          <Skeleton className="h-3 w-2/3" />   {/* helper text */}
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <Skeleton className="h-10 w-20 rounded-lg" /> {/* Back */}
          <Skeleton className="h-10 w-20 rounded-lg" /> {/* Next */}
        </div>
      </div>
    </div>
  )
}
