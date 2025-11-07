"use client";

import { useEffect, useRef } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { useQueryClient } from "@tanstack/react-query";
import { ChatMessage } from "@/lib/types";

interface OutgoingMessage {
  content: string;
  roomId: number;
  username: string;
}

export function useChatWebSocket(roomId: number) {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!user || !roomId) return;

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env
            .NEXT_PUBLIC_API_URL!.replace(/^http/, "ws")
            .replace(/\/$/, "")
        : "ws://localhost:8080";
    const ws = new WebSocket(`${baseUrl}/chat/${roomId}`);

    wsRef.current = ws;

    ws.onopen = () => console.log(`Connected to chat room ${roomId}`);

    ws.onmessage = (event) => {
      try {
        const msg: ChatMessage = JSON.parse(event.data);
        if (!msg.id || !msg.content) return;
        queryClient.setQueryData<ChatMessage[]>(
          ["chat-messages", roomId],
          (old = []) => [...old, msg]
        );
      } catch (e) {
        console.error("Invalid WS message:", e);
      }
    };

    ws.onclose = () => {
      console.log(`Disconnected from chat room ${roomId}`);
      wsRef.current = null;
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);

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
      const payload: OutgoingMessage = {
        username: user.username,
        content,
        roomId,
      };
      ws.send(JSON.stringify(payload));

      // Optymistyczne dodanie wiadomości do cache
      queryClient.setQueryData<ChatMessage[]>(
        ["chat-messages", roomId],
        (old = []) => [
          ...old,
          {
            ...payload,
            id: Date.now(),
            timestamp: new Date().toISOString(),
          },
        ]
      );
    }
  };

  return { sendMessage };
}
