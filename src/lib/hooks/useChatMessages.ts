"use client";

import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/lib/stores/UserStore";
import { ChatMessage } from "@/lib/types";
import api from "@/lib/apiClient";

export function useChatMessages(roomId: number) {
  const { user } = useUserStore(); // token usunięty

  return useQuery<ChatMessage[]>({
    queryKey: ["chat-messages", roomId],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");
      const res = await api.get<ChatMessage[]>(
        `api/chat/rooms/${roomId}/messages`
      );
      return res.data;
    },
    enabled: !!user && !!roomId,
    staleTime: 1000 * 10,
  });
}
