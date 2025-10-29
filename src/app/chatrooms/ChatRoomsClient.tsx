"use client";

import ChatRoomList from "@/components/ChatRoomList";
import CreateRoomForm from "@/components/CreateRoomForm";
import { useUserStore } from "@/lib/stores/UserStore";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";

export const ChatRoomsClient = () => {
  const router = useRouter();
  const { user } = useUserStore();

  const query = useCurrentUser();
  const isLoading = query.isLoading;

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Spinner />;

  return (
    <div className="flex flex-col gap-y-12 px-4 py-4 w-full h-screen md:max-w-[40rem] mx-auto">
      <CreateRoomForm />
      <ChatRoomList />
    </div>
  );
};
