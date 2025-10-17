"use client";

import { useEffect, useRef } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { useQueryClient } from "@tanstack/react-query";
import { ChatMessage } from "../types";
import { useMessages } from "./useMessages";

export function useChatWebSocket(roomId: number) {
  const { token, user } = useUserStore();
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();
  const mountedRef = useRef(false);

  const { data: messagesFromDB = [] } = useMessages(roomId);

  useEffect(() => {
    queryClient.setQueryData<ChatMessage[]>(
      ["chat-messages", roomId],
      messagesFromDB
    );
  }, [messagesFromDB, roomId, queryClient]);

  useEffect(() => {
    if (!token || !user || !roomId) return;

    if (mountedRef.current) return; // ignoruj drugie wywołanie w Strict Mode
    mountedRef.current = true;

    const ws = new WebSocket(
      `ws://localhost:8080/chat/${roomId}?token=${token}`
    );
    wsRef.current = ws;

    ws.onopen = () => console.log(`Connected to chat room ${roomId}`);
    ws.onmessage = (event) => {
      try {
        const msg: ChatMessage = JSON.parse(event.data);
        queryClient.setQueryData<ChatMessage[]>(
          ["chat-messages", roomId],
          (old) => [...(old ?? []), msg]
        );
      } catch {
        console.error("Invalid message format", event.data);
      }
    };

    ws.onclose = () => console.log(`Disconnected from chat room ${roomId}`);

    return () => {
      ws.close();
      mountedRef.current = false; // reset przy unmount
    };
  }, [token, user, roomId, queryClient]);

  const sendMessage = (content: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && user) {
      const payload: Partial<ChatMessage> = {
        username: user.username,
        content,
        roomId,
      };
      wsRef.current.send(JSON.stringify(payload));

      queryClient.setQueryData<ChatMessage[]>(
        ["chat-messages", roomId],
        (old) => [...(old ?? []), payload as ChatMessage]
      );
    }
  };

  return { sendMessage };
}
