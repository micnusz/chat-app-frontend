"use client";

import { useState, useMemo } from "react";
import { useChatList } from "@/lib/hooks/useChatList";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import Spinner from "./Spinner";
import { LoaderCircle, Lock } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import JoinRoomDialog from "./JoinRoomDialog";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import ChatRoomListDetails from "./ChatRoomListDetails";

export default function ChatRoomList() {
  const [filter, setFilter] = useState("");
  const {
    data: rooms,
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useChatList();

  const filteredRooms = useMemo(
    () =>
      rooms?.filter((r) => r.name.toLowerCase().includes(filter.toLowerCase())),
    [rooms, filter]
  );
  if (isLoading) return <Spinner />;
  if (error)
    return <p className="text-red-500">Error: {(error as Error).message}</p>;

  const truncateName = (name: string, maxLength = 30) =>
    name.length > maxLength ? name.slice(0, maxLength) + "…" : name;

  return (
    <div className="flex flex-col gap-2 min-h-[30rem]">
      {rooms && rooms.length > 0 && (
        <>
          <div className="flex flex-row items-center justify-between">
            <h2 className="responsive-h4">Room List:</h2>
            <Button variant={"outline"} size={"sm"} onClick={() => refetch()}>
              {isRefetching ? (
                <Spinner aria-label="Refreshing..." />
              ) : (
                <LoaderCircle aria-label="Refresh" />
              )}
            </Button>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search rooms..."
              className="max-w-md"
            />
            <Button
              variant={filter.length === 0 ? "outline" : "destructive"}
              className="text-foreground"
              onClick={() => setFilter("")}
              disabled={filter.length === 0}
            >
              Clear
            </Button>
          </div>
        </>
      )}

      <ScrollArea className="flex-1 max-h-[40rem] overflow-y-auto rounded-md p-4">
        <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredRooms?.map((room) => (
            <div key={room.id}>
              <Card className="bg-background/70 dark:bg-input/40 border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
                <CardHeader className="flex justify-between items-start">
                  <CardTitle className="font-bold text-foreground truncate max-w-[70%]">
                    <HoverCard>
                      <HoverCardTrigger>
                        {truncateName(room.name)}
                      </HoverCardTrigger>
                      <HoverCardContent>{room.name}</HoverCardContent>
                    </HoverCard>
                  </CardTitle>
                  {room.requiresPassword && (
                    <div className="flex items-center gap-2">
                      <HoverCard>
                        <HoverCardTrigger>
                          <Lock className="w-4 h-4 text-destructive" />
                        </HoverCardTrigger>
                        <HoverCardContent>
                          This room requires a password to join.
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  )}
                </CardHeader>

                <CardFooter className="mt-2 flex flex-row gap-x-2">
                  <JoinRoomDialog room={room} />
                  <ChatRoomListDetails room={room} />
                </CardFooter>
              </Card>
            </div>
          ))}

          {filteredRooms?.length === 0 && (
            <p className="text-muted-foreground text-sm text-center col-span-full">
              No rooms found.
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
