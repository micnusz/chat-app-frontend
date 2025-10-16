"use client";

import { useState } from "react";
import JoinRoomDialog from "./JoinRoomDialog";
import { useChatList } from "@/lib/hooks/useChatList";
import { Button } from "./ui/button";
import { ChatRoom } from "@/lib/types";

export default function ChatRoomList() {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: rooms, isLoading, error } = useChatList();

  if (isLoading) return <p>Fetching list...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  const handleJoinClick = (room: ChatRoom) => {
    setSelectedRoom(room);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-2 ">
      {rooms?.map((room) => (
        <div
          key={room.id}
          className="flex justify-between items-center p-2 border rounded"
        >
          <span>{room.name}</span>
          <Button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleJoinClick(room)}
          >
            Join
          </Button>
        </div>
      ))}

      {selectedRoom && (
        <JoinRoomDialog
          room={selectedRoom}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </div>
  );
}
