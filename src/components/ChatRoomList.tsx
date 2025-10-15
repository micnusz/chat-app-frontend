"use client";

import { useState, useEffect } from "react";
import api from "@/lib/apiClient";
import JoinRoomDialog from "./JoinRoomDialog";

interface Room {
  id: number;
  name: string;
  password?: string;
}

export default function ChatRoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await api.get("/api/chat/rooms");
      setRooms(res.data);
    };
    fetchRooms();
  }, []);

  const handleJoinClick = (room: Room) => {
    setSelectedRoom(room);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-2 max-w-md mx-auto">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="flex justify-between items-center p-2 border rounded"
        >
          <span>{room.name}</span>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleJoinClick(room)}
          >
            Dołącz
          </button>
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
