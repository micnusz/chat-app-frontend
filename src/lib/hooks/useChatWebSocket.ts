"use client";

import { useEffect, useRef } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { useQueryClient } from "@tanstack/react-query";
import { ChatMessage } from "@/lib/types";

export function useChatWebSocket(roomId: number) {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!user || !roomId) return;

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const WS_URL =
      process.env.NODE_ENV === "production"
        ? baseUrl.replace(/^https?/, "wss").replace(/\/$/, "")
        : "ws://localhost:8080";

    const ws = new WebSocket(`${WS_URL}/api/chat/${roomId}`);
    wsRef.current = ws;

    ws.onopen = () => console.log(`Connected to chat room ${roomId}`);
    ws.onmessage = (event) => {
      try {
        const msg: ChatMessage = JSON.parse(event.data);
        queryClient.setQueryData<ChatMessage[]>(
          ["chat-messages", roomId],
          (old = []) => [...old, msg]
        );
      } catch (e) {
        console.error("Invalid WS message:", e);
      }
    };
    ws.onclose = () => console.log(`Disconnected from chat room ${roomId}`);

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close(1000, "Component unmounted");
      }
    };
  }, [user, roomId, queryClient]);

  const sendMessage = (content: string) => {
    const ws = wsRef.current;
    if (ws?.readyState === WebSocket.OPEN && user) {
      const payload: Partial<ChatMessage> = {
        username: user.username,
        content,
        roomId,
      };
      ws.send(JSON.stringify(payload));

      queryClient.setQueryData<ChatMessage[]>(
        ["chat-messages", roomId],
        (old = []) => [...old, payload as ChatMessage]
      );
    }
  };

  return { sendMessage };
}
