"use client";

import CreateRoomForm from "@/components/CreateRoomForm";
import api from "@/lib/apiClient";
import { ChatRoom } from "@/lib/types";
import { useEffect, useState } from "react";

export const ChatRoomsClient = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/api/chat/rooms");
      console.log("Rooms response:", res.data);
      console.log("Is array:", Array.isArray(res.data));
      setRooms(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Twoje pokoje</h1>
      <CreateRoomForm onRoomCreated={fetchRooms} />
      <ul className="mt-4">
        {rooms.map((room) => (
          <li key={room.id} className="border p-2 rounded mb-2">
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
