"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonChatRoom() {
  return (
    <div className="flex justify-center w-full animate-pulse">
      <div className="flex flex-col w-full max-w-[40rem] gap-2 h-screen px-4 py-4">
        <div className="flex flex-row gap-x-2 items-center">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-12 rounded-md" />
          <div className="flex-1" />
        </div>

        <div className="flex-1 overflow-y-auto border rounded-md p-2 max-h-[30rem]">
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, idx) => {
              const isMine = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    isMine ? "items-end" : "items-start"
                  } gap-1`}
                >
                  {!isMine && <Skeleton className="h-6 w-24 rounded" />}

                  <Skeleton
                    className={`h-10 rounded ${isMine ? "w-1/4" : "w-2/4"}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10  w-20 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
