"use client";

import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/lib/stores/UserStore";
import { ChatMessage } from "@/lib/types";
import api from "@/lib/apiClient";

export function useChatMessages(roomId: number) {
  const { token } = useUserStore();

  return useQuery<ChatMessage[]>({
    queryKey: ["chat-messages", roomId],
    queryFn: async () => {
      if (!token) throw new Error("No token");
      const res = await api.get<ChatMessage[]>(
        `/api/chat/rooms/${roomId}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    enabled: !!token && !!roomId,
    staleTime: 1000 * 10,
  });
}
