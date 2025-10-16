"use client";

import ChatRoomList from "@/components/ChatRoomList";
import CreateRoomForm from "@/components/CreateRoomForm";

export const ChatRoomsClient = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Twoje pokoje</h1>
      <CreateRoomForm />
      <ChatRoomList />
    </div>
  );
};
