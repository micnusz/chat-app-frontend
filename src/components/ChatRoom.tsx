"use client";

import { useChatMessages } from "@/lib/hooks/useChatMessages";
import { useChatWebSocket } from "@/lib/hooks/useChatWebSocket";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import ChatRoomNavigation from "./ChatRoomNavigation";
import { useGetChatRoomInfo } from "@/lib/hooks/useGetChatRoomInfo";

type ChatRoomProps = {
  roomId: number;
};

export default function ChatRoom({ roomId }: ChatRoomProps) {
  const { data: messages = [] } = useChatMessages(roomId);
  const { sendMessage } = useChatWebSocket(roomId);
  const { data: room } = useGetChatRoomInfo(roomId);
  if (!room) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full p-4 gap-2 ">
      <ChatRoomNavigation roomId={roomId} createdBy={room.createdBy} />
      <ChatMessages messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
