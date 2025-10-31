"use client";

import { useChatMessages } from "@/lib/hooks/useChatMessages";
import { useChatWebSocket } from "@/lib/hooks/useChatWebSocket";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import ChatRoomNavigation from "./ChatRoomNavigation";
import { useGetChatRoomInfo } from "@/lib/hooks/useGetChatRoomInfo";
import Spinner from "./Spinner";
import SkeletonChatRoom from "./ui/Skeletons/SkeletonChatRoom";

type ChatRoomProps = {
  roomId: number;
};

export default function ChatRoom({ roomId }: ChatRoomProps) {
  const { data: messages = [] } = useChatMessages(roomId);
  const { sendMessage } = useChatWebSocket(roomId);
  const { data: room } = useGetChatRoomInfo(roomId);

  if (!room)
    return (
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-full max-w-[40rem] gap-2 h-screen">
          <SkeletonChatRoom />
        </div>
      </div>
    );

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-full max-w-[40rem] gap-2 h-screen">
        <ChatRoomNavigation roomId={roomId} createdBy={room.createdBy} />
        <ChatMessages messages={messages} />
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}
