"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function HomepageSkeleton() {
  return (
    <div className="p-6 space-y-8">
      {/* Top header bar */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-40 rounded-lg" /> {/* Logo */}
        <div className="flex space-x-4">
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>

      {/* Hero section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-56 w-full rounded-xl" /> {/* Hero image */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4 rounded-lg" /> {/* Title */}
          <Skeleton className="h-6 w-1/2 rounded-lg" />
          <Skeleton className="h-6 w-2/3 rounded-lg" />
          <div className="flex space-x-3 pt-4">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Recommended / cards */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40 rounded-lg" /> {/* Section title */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
