import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { ChatRoom } from "../types";

async function fetchAllChatRooms(): Promise<ChatRoom[]> {
  const res = await api.get<ChatRoom[]>("/api/chat/rooms");
  return res.data;
}

export function useChatList() {
  return useQuery<ChatRoom[]>({
    queryKey: ["all-chat-rooms"],
    queryFn: fetchAllChatRooms,
  });
}
