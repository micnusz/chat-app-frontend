"use client";

import { useEffect, useRef, useState } from "react";

export const ChatComponents = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/chat");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connected with WebSocket");
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => {
      console.log("Disconnected with WebSocket");
    };

    ws.onerror = (err) => {
      console.error("⚠️ Error WebSocket:", err);
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN &&
      input.trim()
    ) {
      wsRef.current.send(input);
      setInput("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">💬 Chat (Native WebSocket)</h2>

      <div className="border p-3 h-64 overflow-y-auto bg-gray-50 rounded-lg shadow-inner">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm">Brak wiadomości...</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className="p-1">
            {msg}
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          className="border flex-grow p-2 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Napisz wiadomość..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Wyślij
        </button>
      </div>
    </div>
  );
};
