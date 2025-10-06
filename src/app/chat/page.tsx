"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stores/UserStore";
import { ChatComponents } from "@/components/ChatComponent";

export default function ChatPage() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  // redirect jeśli niezalogowany
  useEffect(() => {
    if (!user) router.push("/");
  }, [user, router]);

  if (!user) return null; // lub spinner/loading

  const handleLogout = () => {
    clearUser();
    router.push("/");
  };

  return (
    <div>
      <h1>Czat</h1>
      <p>Zalogowany jako: {user.username}</p>
      <button onClick={handleLogout}>Wyloguj</button>
      <ChatComponents />
    </div>
  );
}
