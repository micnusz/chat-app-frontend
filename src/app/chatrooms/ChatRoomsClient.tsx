"use client";

import ChatRoomList from "@/components/ChatRoomList";
import CreateRoomForm from "@/components/CreateRoomForm";

export const ChatRoomsClient = () => {
  return (
    <div className="flex flex-col gap-y-12 px-4 py-4 w-full md:max-w-[40rem] mx-auto">
      <CreateRoomForm />
      <ChatRoomList />
    </div>
  );
};
