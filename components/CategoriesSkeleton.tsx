import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const CategoriesSkeleton = () => {
  return (
    <div className="block w-fit mx-auto">
      <div className="flex flex-col gap-3 p-5">
        <div className="mb-2 space-y-3">
          <Skeleton className="h-6 w-[300px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <div className="flex items-center justify-center gap-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <Skeleton className="hidden md:block h-[125px] w-[250px] rounded-xl" />
          <Skeleton className="hidden sm:block h-[125px] w-[250px] rounded-xl" />
          <Skeleton className="hidden lg:block h-[125px] w-[250px] rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default CategoriesSkeleton
