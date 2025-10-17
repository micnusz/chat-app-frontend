import { useUserStore } from "@/lib/stores/UserStore";
import { ChatMessage } from "@/lib/types";
import { ScrollArea } from "./ui/scroll-area";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const user = useUserStore((state) => state.user);

  return (
    <ScrollArea className="h-[20rem] w-[40rem] rounded-md border p-2">
      <div className="flex flex-col gap-y-2">
        {messages.length === 0 ? (
          <div className="text-gray-500">No messages yet</div>
        ) : (
          messages.map((msg, idx) => {
            const isMine = msg.username === user?.username;
            return (
              <div
                key={idx}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-xs break-words ${
                    isMine
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-300 text-red-200 rounded-bl-none"
                  }`}
                >
                  {!isMine && <strong>{msg.username}: </strong>}
                  {msg.content}
                </div>
              </div>
            );
          })
        )}
      </div>
    </ScrollArea>
  );
}
