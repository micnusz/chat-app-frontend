import { useUserStore } from "@/lib/stores/UserStore";
import { ChatMessage } from "@/lib/types";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex-1 overflow-y-auto border rounded p-2 flex flex-col gap-2 max-w-[40rem]">
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
  );
}
