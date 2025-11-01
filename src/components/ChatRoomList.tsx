"use client";

import { useState } from "react";
import JoinRoomDialog from "./JoinRoomDialog";
import { useChatList } from "@/lib/hooks/useChatList";
import { Button } from "./ui/button";
import { ChatRoom } from "@/lib/types";
import { Calendar, Lock, User } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SkeletonChatRoomList } from "./ui/Skeletons/SkeletonChatRoomList";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";

export default function ChatRoomList() {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const { data: rooms, isLoading, error } = useChatList();

  if (isLoading) return <SkeletonChatRoomList count={3} />;
  if (error)
    return <p className="text-red-500">Error: {(error as Error).message}</p>;

  const handleJoinClick = (room: ChatRoom) => {
    setSelectedRoom(room);
    setDialogOpen(true);
  };

  const truncateName = (name: string, maxLength = 30) =>
    name.length > maxLength ? name.slice(0, maxLength) + "…" : name;

  const filteredRooms = rooms?.filter((r) =>
    r.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      {filteredRooms?.length ? (
        <h2 className="text-xl font-semibold">Room List</h2>
      ) : null}

      <div className="flex gap-2">
        <Input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search rooms..."
          className=" max-w-md"
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

      <ScrollArea className="h-[32rem] rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {filteredRooms?.map((room) => (
            <div
              key={room.id}
              className="flex flex-col justify-between p-4 border border-border rounded-xl hover:shadow-md transition-shadow duration-200 bg-background/60 dark:bg-input/30"
            >
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <HoverCard>
                  <HoverCardTrigger className="flex items-center gap-2 min-w-0">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground truncate">
                      {truncateName(room.name)}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm max-w-xs">
                    Room name: {room.name}
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger className="flex items-center gap-2 min-w-0">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {room.createdAt
                        ? new Date(room.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm max-w-xs">
                    Created at:{" "}
                    {room.createdAt
                      ? new Date(room.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </HoverCardContent>
                </HoverCard>

                {room.requiresPassword && (
                  <HoverCard>
                    <HoverCardTrigger className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-chart-2" />
                      <span className="text-sm text-chart-2">Protected</span>
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      This room requires a password to join.
                    </HoverCardContent>
                  </HoverCard>
                )}
              </div>

              <JoinRoomDialog
                room={room}
                open={selectedRoom?.id === room.id && dialogOpen}
                onClose={() => {
                  setDialogOpen(false);
                  setSelectedRoom(null);
                }}
              >
                <Button
                  variant="destructive"
                  className="mt-3 text-foreground"
                  onClick={() => handleJoinClick(room)}
                >
                  Join
                </Button>
              </JoinRoomDialog>
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
