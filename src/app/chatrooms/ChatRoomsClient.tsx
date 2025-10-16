"use client";

import ChatRoomList from "@/components/ChatRoomList";
import CreateRoomForm from "@/components/CreateRoomForm";

export const ChatRoomsClient = () => {
  return (
    <div className="py-4 px-12 flex flex-col gap-y-12">
      <CreateRoomForm />
      <ChatRoomList />
    </div>
  );
};
