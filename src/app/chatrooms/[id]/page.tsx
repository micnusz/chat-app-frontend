import ChatRoom from "@/components/ChatRoom";
import { notFound } from "next/navigation";

interface ChatRoomPageProps {
  params: { id: string };
}

// Server-side page
export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const roomId = parseInt(params.id, 10);

  if (isNaN(roomId)) {
    return notFound();
  }

  return (
    <div className="h-full min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Chat Room #{roomId}</h1>
      <ChatRoom roomId={roomId} />
    </div>
  );
}
