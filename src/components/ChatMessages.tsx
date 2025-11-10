import { useEffect, useRef } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { ChatMessage } from "@/lib/types";
import { formatTimestamp } from "@/lib/helper/formatTimestamp";
import getUserColor from "@/lib/helper/getUserColor";

type ChatMessagesProps = {
  messages: ChatMessage[];
};

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const user = useUserStore((s) => s.user);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const processedMessages = messages.map((m) => ({
    ...m,
    time: new Date(m.timestamp).getTime(),
  }));

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto rounded-md border-1 p-2 scrollbar-hide max-h-[30rem]"
    >
      <div className="flex flex-col gap-y-1">
        {processedMessages.length === 0 && (
          <div className="text-muted-foreground">No messages yet</div>
        )}

        {processedMessages.map((msg, idx) => {
          const isMine =
            user?.username?.toLowerCase() === msg.username?.toLowerCase();
          const isSystem = msg.username === "System";

          const prev = idx > 0 ? processedMessages[idx - 1] : null;
          const isFirstOfGroup =
            !prev ||
            prev.username !== msg.username ||
            prev.username === "System" ||
            msg.time - prev.time > 60 * 1000;

          const base = "px-3 py-2 rounded-lg max-w-xs break-words text-sm";

          const bubbleStyle = isSystem
            ? {}
            : isMine
            ? {}
            : {
                backgroundColor: getUserColor(msg.username ?? "unknown"),
                color: "white",
              };

          const bubbleClass = isSystem
            ? "bg-transparent text-red-500 italic text-xs"
            : isMine
            ? "bg-primary text-background rounded-br-none"
            : "rounded-bl-none";

          return (
            <div
              key={idx}
              className={`flex flex-col ${
                isMine ? "items-end" : "items-start"
              }`}
            >
              {isFirstOfGroup && !isSystem && (
                <div
                  className={`flex flex-row items-center gap-1 text-xs text-muted-foreground mb-1 ${
                    isMine ? "justify-end" : ""
                  }`}
                >
                  {!isMine && (
                    <span className="font-semibold text-xs">
                      {msg.username} -
                    </span>
                  )}
                  <span>{formatTimestamp(msg.timestamp)}</span>
                </div>
              )}

              <div className={`${base} ${bubbleClass}`} style={bubbleStyle}>
                <p>{msg.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
