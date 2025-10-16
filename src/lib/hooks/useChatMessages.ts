"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserStore } from "@/lib/stores/UserStore";
import { ChatMessage } from "../types";

export function useChatMessages(roomId: number) {
  const { token } = useUserStore();

  return useQuery<ChatMessage[]>({
    queryKey: ["chat-messages", roomId],
    queryFn: async () => {
      if (!token) throw new Error("No token");
      const res = await axios.get<ChatMessage[]>(`/api/messages/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!token && !!roomId,
  });
}
