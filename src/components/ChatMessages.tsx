"use client";

interface ChatMessagesProps {
  messages: string[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto border rounded p-2">
      {messages.length === 0 ? (
        <div className="text-gray-500">No messages yet</div>
      ) : (
        messages.map((msg, idx) => (
          <div key={idx} className="mb-1">
            {msg}
          </div>
        ))
      )}
    </div>
  );
}
