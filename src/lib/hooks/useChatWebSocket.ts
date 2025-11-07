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

    const WS_URL =
      process.env.NODE_ENV === "production"
        ? "wss://chat-app-backend-45zf.onrender.com/chat"
        : "ws://localhost:8080/chat";

    const ws = new WebSocket(`${WS_URL}/${roomId}`);
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
    ws.onerror = (err) =>
      console.error(`WebSocket error in room ${roomId}:`, err);
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
