"use client";

import { useState } from "react";
import { useChatMessages } from "@/lib/hooks/useChatMessages";
import { useChatWebSocket } from "@/lib/hooks/useChatWebSocket";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import ChatRoomNavigation from "./ChatRoomNavigation";

type ChatRoomProps = {
  roomId: number;
};

export default function ChatRoom({ roomId }: ChatRoomProps) {
  const { data: messages = [] } = useChatMessages(roomId);
  const { sendMessage } = useChatWebSocket(roomId);

  return (
    <div className="flex flex-col h-full p-4 gap-2 ">
      <ChatRoomNavigation roomId={roomId} />
      <ChatMessages messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
