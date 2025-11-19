"use server";
import type { Metadata } from "next";
import ChatRoom from "@/components/ChatRoom";
import { notFound } from "next/navigation";

type ChatRoomPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: ChatRoomPageProps): Promise<Metadata> {
  const { slug } = params;

  // wyciągamy ID z końca sluga
  const match = slug.match(/-(\d+)$/);
  if (!match) return { title: "Chat", description: "Unknown room" };

  const roomId = Number(match[1]);
  if (isNaN(roomId)) return { title: "Chat", description: "Unknown room" };
  const readableTitle = slug.replace(/-\d+$/, "").replace(/-/g, " ");

  return {
    title: `Chat – ${readableTitle}`,
    description: `Room #${roomId}`,
  };
}

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { slug } = params;

  const match = slug.match(/-(\d+)$/);
  if (!match) return notFound();
  const roomId = Number(match[1]);
  if (isNaN(roomId)) return notFound();

  return <ChatRoom roomId={roomId} />;
}
