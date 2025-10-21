"use server";
import ChatRoom from "@/components/ChatRoom";
import { notFound } from "next/navigation";

type ChatRoomPageProps = {
  params: { slug: string };
};

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { slug } = params;

  const match = slug.match(/-(\d+)$/);
  if (!match) return notFound();
  const roomId = parseInt(match[1], 10);
  if (isNaN(roomId)) return notFound();

  return (
    <div className="p-4 mt-4  h-screen">
      <ChatRoom roomId={roomId} />
    </div>
  );
}
