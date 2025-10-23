import { useEffect, useRef } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { useQueryClient } from "@tanstack/react-query";
import { ChatMessage } from "../types";
import { useMessages } from "./useMessages";

export function useChatWebSocket(roomId: number) {
  const { token, user } = useUserStore();
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);
  const { data: messagesFromDB = [] } = useMessages(roomId);

  useEffect(() => {
    queryClient.setQueryData<ChatMessage[]>(
      ["chat-messages", roomId],
      messagesFromDB
    );
  }, [messagesFromDB, roomId, queryClient]);

  useEffect(() => {
    if (!token || !user || !roomId) return;

    // TO CHANGE IN PROD
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
  }, [token, user, roomId, queryClient]);

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
