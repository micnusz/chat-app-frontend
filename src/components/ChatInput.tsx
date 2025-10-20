import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ChatInputProps {
  onSend: (msg: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        className="flex-1 border rounded p-2"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button
        onClick={handleSend}
        variant={input == "" ? "outline" : "destructive"}
        disabled={input == ""}
      >
        Send
      </Button>
    </div>
  );
}
