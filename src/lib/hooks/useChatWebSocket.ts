"use client";

import { useEffect, useRef } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { useQueryClient } from "@tanstack/react-query";
import { ChatMessage } from "@/lib/types";
import { useRouter } from "next/navigation";

export function useChatWebSocket(roomId: number) {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user || !roomId) return;

    const WS_BASE =
      process.env.NODE_ENV === "production"
        ? "wss://chatapi.micnusz.xyz/chat"
        : "ws://localhost:8080/chat";

    const ws = new WebSocket(`${WS_BASE}/${roomId}`);
    wsRef.current = ws;

    ws.onopen = () => console.log(`WS connected: room ${roomId}`);

    ws.onmessage = (event) => {
      try {
        const msg: ChatMessage & { error?: string } = JSON.parse(event.data);

        if (msg.error === "Room has been deleted") {
          ws.close(1000, msg.error);
          router.push("/chatrooms");
          return;
        }

        queryClient.setQueryData<ChatMessage[]>(
          ["chat-messages", roomId],
          (old = []) => [...old, msg]
        );
      } catch (err) {
        console.error("Bad WS message:", err);
      }
    };

    ws.onerror = (e) => console.error(`WS error room ${roomId}:`, e);

    ws.onclose = (event) =>
      console.log(`WS closed room ${roomId}:`, event.reason);

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close(1000, "unmount");
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
