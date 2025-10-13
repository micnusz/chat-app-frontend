import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/lib/stores/UserStore";

export interface ChatMessage {
  username: string;
  message: string;
}

export function useChat() {
  const { token, user } = useUserStore();
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!token || !user) return;

    const ws = new WebSocket(`ws://localhost:8080/chat?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => console.log("Connected to chat");

    ws.onmessage = (event) => {
      try {
        const msg: ChatMessage = JSON.parse(event.data);

        // ignoruj wiadomości od siebie, żeby nie dublować
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
      wsRef.current.send(text);

      // od razu dodajemy do listy, żeby pokazać w UI
      setMessages((prev) => [...prev, payload]);
    }
  };

  return { messages, sendMessage };
}
