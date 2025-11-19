"use server";
import { Metadata } from "next";
import { ChatRoomsClient } from "./ChatRoomsClient";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Chat App - Chatrooms",
    description: "App created by Michał Nuszkiewicz as a portfolio project.",
  };
};

export default async function ChatRoomsPage() {
  return <ChatRoomsClient />;
}
