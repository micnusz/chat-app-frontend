// useChatStore.ts
import { create } from "zustand";

export interface ChatMessage {
  username: string;
  message: string;
}

interface ChatState {
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => {
  // Wczytanie z sessionStorage przy starcie
  const saved = sessionStorage.getItem("chatMessages");
  const initialMessages: ChatMessage[] = saved ? JSON.parse(saved) : [];

  return {
    messages: initialMessages,
    addMessage: (msg) =>
      set((state) => {
        const updated = [...state.messages, msg];
        sessionStorage.setItem("chatMessages", JSON.stringify(updated));
        return { messages: updated };
      }),
    clearMessages: () => {
      sessionStorage.removeItem("chatMessages");
      set({ messages: [] });
    },
  };
});
