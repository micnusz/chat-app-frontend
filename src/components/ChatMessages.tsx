import { useEffect, useRef } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { ChatMessage } from "@/lib/types";
import { formatTimestamp } from "@/lib/helper/formatTimestamp";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const user = useUserStore((s) => s.user);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="h-[20rem] w-[40rem] overflow-y-auto rounded-md border p-2 scrollbar-hide"
    >
      <div className="flex flex-col gap-y-2">
        {messages.length === 0 ? (
          <div className="text-gray-500">No messages yet</div>
        ) : (
          messages.map((msg, idx) => {
            const isMine = msg.username === user?.username;
            const isSystem = msg.username === "System";

            const base = "px-3 py-2 rounded-lg max-w-xs break-words text-sm";
            const bubble = isSystem
              ? "bg-transparent text-chart-3 italic text-xs"
              : isMine
              ? "bg-chart-4 text-foreground rounded-br-none"
              : "bg-foreground text-background rounded-bl-none";

            return (
              <div
                key={idx}
                className={`flex flex-col ${
                  isMine ? "items-end" : "items-start"
                }`}
              >
                {!isSystem && !isMine && (
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-1">
                    <span className="font-semibold text-xs">
                      {msg.username} -
                    </span>
                    <span className="text-xs">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>
                )}
                <div className={`${base} ${bubble}`}>
                  {isSystem ? <p>{msg.content}</p> : <p>{msg.content}</p>}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
