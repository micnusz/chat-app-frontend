"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCreateRoomForm() {
  return (
    <div className="flex flex-col gap-y-4 w-full max-w-sm md:max-w-full animate-pulse">
      <Skeleton className="h-6 w-32 rounded" />
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />

        <Skeleton className="h-8 w-1/2 rounded-md mt-1" />
      </div>
    </div>
  );
}
