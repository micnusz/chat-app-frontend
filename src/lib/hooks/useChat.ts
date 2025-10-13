"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/lib/stores/UserStore";

export interface ChatMessage {
  username: string;
  message: string;
}

export function useChat() {
  const { token, user } = useUserStore();
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Pobierz historię wiadomości z backendu
  useEffect(() => {
    if (!token) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/messages/default-room", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const chatMessages: ChatMessage[] = res.data.map((m: any) => ({
          username: m.sender.username,
          message: m.content,
        }));

        setMessages(chatMessages);
      } catch (err) {
        console.error("Failed to fetch chat messages:", err);
      }
    };

    fetchMessages();
  }, [token]);

  // WebSocket do nowych wiadomości
  useEffect(() => {
    if (!token || !user) return;

    const ws = new WebSocket(`ws://localhost:8080/chat?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => console.log("Connected to chat");
    ws.onmessage = (event) => {
      try {
        const msg: ChatMessage = JSON.parse(event.data);

        // Ignoruj własne wiadomości, żeby nie dublować
        if (msg.username !== user.username) {
          setMessages((prev) => [...prev, msg]);
        }
      } catch {
        console.error("Invalid message format", event.data);
      }
    };

    ws.onclose = () => console.log("Disconnected from chat");

    return () => ws.close();
  }, [token, user]);

  const sendMessage = (text: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && user) {
      const payload: ChatMessage = { username: user.username, message: text };
      wsRef.current.send(JSON.stringify(payload));

      // Dodaj własną wiadomość lokalnie od razu
      setMessages((prev) => [...prev, payload]);
    }
  };

  return { messages, sendMessage };
}
