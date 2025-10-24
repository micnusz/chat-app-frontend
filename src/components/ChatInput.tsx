import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { messageSchema } from "@/lib/validation/messageSchema";

interface ChatInputProps {
  onSend: (msg: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSend = () => {
    const result = messageSchema.safeParse({ message });

    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    setValidationError(null);
    onSend(message);
    setMessage("");
  };

  const messageLength = message.trim().length;
  const maxLength = 1000;

  return (
    <>
      <div className="flex gap-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 border rounded p-2"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          onClick={handleSend}
          variant={message == "" ? "outline" : "default"}
          disabled={message == ""}
        >
          Send
        </Button>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1 items-center">
        <span>
          {validationError && (
            <span className="text-red-500">{validationError}</span>
          )}
        </span>
        <span>
          {messageLength}/{maxLength}
        </span>
      </div>
    </>
  );
}
