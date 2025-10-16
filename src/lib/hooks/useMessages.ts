"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { ChatMessage } from "@/lib/types";

export function useMessages(roomId: number) {
  return useQuery<ChatMessage[]>({
    queryKey: ["messages", roomId],
    queryFn: async () => {
      const res = await api.get(`/api/chat/rooms/${roomId}/messages`);
      return res.data;
    },
    staleTime: 1000 * 10,
  });
}
