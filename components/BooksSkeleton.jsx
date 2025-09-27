import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const BooksSkeleton = () => {
  return (
    <div className="block w-fit mx-auto my-10">
      <div className="flex flex-col gap-3 p-5">
        <div className="mb-2 space-y-3">
          <Skeleton className="h-6 w-[300px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <Skeleton className="h-4 w-[70px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
          <div className="hidden md:block space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <Skeleton className="h-4 w-[70px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
          <div className="hidden sm:block space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <Skeleton className="h-4 w-[70px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
          <div className="hidden lg:block space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <Skeleton className="h-4 w-[70px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BooksSkeleton
