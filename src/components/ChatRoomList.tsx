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
import Spinner from "./Spinner";

export default function ChatRoomList() {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: rooms, isLoading, error } = useChatList();

  if (isLoading) return <Spinner />;
  if (error)
    return <p className="text-red-500">Error: {(error as Error).message}</p>;

  const handleJoinClick = (room: ChatRoom) => {
    setSelectedRoom(room);
    setDialogOpen(true);
  };

  const truncateName = (name: string, maxLength = 30) =>
    name.length > maxLength ? name.slice(0, maxLength) + "…" : name;

  return (
    <div className="space-y-3 w-full">
      {rooms?.length ? <h1>Room List:</h1> : null}
      {rooms?.map((room) => (
        <div
          key={room.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-border rounded-xl w-full hover:shadow-lg transition-shadow duration-200 dark:bg-input/30"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 min-w-0">
            <HoverCard>
              <HoverCardTrigger className="flex items-center gap-1 min-w-0">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground truncate">
                  {truncateName(room.name)}
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm max-w-xs">
                Name: {room.name}
              </HoverCardContent>
            </HoverCard>

            <div className="flex items-center gap-1">
              <HoverCard>
                <HoverCardTrigger className="flex items-center gap-1 min-w-0">
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
            </div>

            {room.requiresPassword && (
              <HoverCard>
                <HoverCardTrigger className="flex flex-row gap-x-1 items-center">
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
              variant={"destructive"}
              onClick={() => handleJoinClick(room)}
              className="mt-3 sm:mt-0 ml-auto sm:ml-0 text-foreground"
            >
              Join
            </Button>
          </JoinRoomDialog>
        </div>
      ))}
    </div>
  );
}
