"use client";

import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/lib/stores/UserStore";

export function useChat() {
  const { token, user } = useUserStore();
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`ws://localhost:8080/chat?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => console.log("Connected to chat");
    ws.onmessage = (event) => setMessages((prev) => [...prev, event.data]);
    ws.onclose = () => console.log("Disconnected from chat");

    return () => ws.close();
  }, [token]);

  const sendMessage = (msg: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    }
  };

  return { messages, sendMessage, user };
}
