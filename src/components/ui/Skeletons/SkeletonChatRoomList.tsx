"use client";

import { Skeleton } from "@/components/ui/skeleton";

type SkeletonChatRoomListProps = {
  count?: number;
};

export function SkeletonChatRoomList({ count = 3 }: SkeletonChatRoomListProps) {
  return (
    <div className="space-y-3 w-full animate-pulse">
      <div className="flex flex-row gap-x-2">
        <Skeleton className="h-8 w-full rounded " />
        <Skeleton className="h-8 w-20 rounded " />
      </div>

      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row items-start sm:items-center p-4 border border-border rounded-xl w-full"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 min-w-0">
            <Skeleton className="h-4 w-32 rounded " />
            <Skeleton className="h-4 w-20 rounded " />
            <Skeleton className="h-4 w-16 rounded " />
          </div>

          <div className="w-full sm:w-auto flex justify-end mt-3 sm:mt-0">
            <Skeleton className="h-8 w-20 rounded-md bg-card" />
          </div>
        </div>
      ))}
    </div>
  );
}
