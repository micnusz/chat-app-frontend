import ChatRoom from "@/components/ChatRoom";
import { notFound } from "next/navigation";

interface ChatRoomPageProps {
  params: { id: string };
}

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const roomId = parseInt(params.id, 10);

  if (isNaN(roomId)) {
    return notFound();
  }

  return (
    <div className="p-4 h-full">
      <h1 className="text-lg font-bold mb-4">Chat Room #{roomId}</h1>
      <ChatRoom roomId={roomId} />
    </div>
  );
}
