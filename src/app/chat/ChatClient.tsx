"use client";

import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";
import { useChat } from "@/lib/hooks/useChat";

export default function ChatClient() {
  const { messages, sendMessage } = useChat();

  return (
    <div className="border rounded p-4 flex flex-col gap-2 h-[500px]">
      <ChatMessages messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
