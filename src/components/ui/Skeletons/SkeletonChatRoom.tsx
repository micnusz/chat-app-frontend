"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonChatRoom() {
  return (
    <div className="flex justify-center w-full animate-pulse">
      <div className="flex flex-col w-full max-w-[40rem] gap-2 h-screen">
        <div className="flex flex-row gap-x-2 items-center">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-12 rounded-md" />
          <div className="flex-1" />
        </div>

        <div className="flex-1 overflow-y-auto border rounded-md p-2 max-h-[30rem]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-1">
              <Skeleton className="h-[1.5rem] w-24 rounded" />
              <Skeleton className="h-[1.5rem] w-2/5 rounded" />
            </div>
            <div className="flex flex-col items-start gap-1">
              <Skeleton className="h-6 w-20 rounded" />
              <Skeleton className="h-8 w-1/3 rounded" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <Skeleton className="h-[12rem] w-3/4 rounded" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
