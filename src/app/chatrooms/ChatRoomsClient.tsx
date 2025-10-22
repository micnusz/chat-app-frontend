"use client";

import ChatRoomList from "@/components/ChatRoomList";
import CreateRoomForm from "@/components/CreateRoomForm";
import { useUserStore } from "@/lib/stores/UserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ChatRoomsClient = () => {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-y-12 px-4 py-4 w-full md:max-w-[40rem] mx-auto">
      <CreateRoomForm />
      <ChatRoomList />
    </div>
  );
};
