import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/lib/stores/UserStore";

export interface ChatMessage {
  username: string;
  message: string;
}

export function useChat() {
  const { token, user } = useUserStore();
  const wsRef = useRef<WebSocket | null>(null);

  // Wczytanie wiadomości z sessionStorage
  const initialMessages: ChatMessage[] = (() => {
    const saved = sessionStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  })();

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

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
          setMessages((prev) => {
            const updated = [...prev, msg];
            sessionStorage.setItem("chatMessages", JSON.stringify(updated));
            return updated;
          });
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

      // zapisujemy lokalnie od razu
      setMessages((prev) => {
        const updated = [...prev, payload];
        sessionStorage.setItem("chatMessages", JSON.stringify(updated));
        return updated;
      });
    }
  };

  return { messages, sendMessage };
}
