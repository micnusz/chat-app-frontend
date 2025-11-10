"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { ChatRoom } from "../types";

export function useGetChatRoomInfo(roomId: number) {
  return useQuery<ChatRoom>({
    queryKey: ["chat-room", roomId],
    queryFn: async () => {
      const res = await api.get<ChatRoom>(`/api/chat/rooms/${roomId}`);
      return res.data;
    },
    enabled: !!roomId,
    staleTime: 1000 * 30,
  });
}
