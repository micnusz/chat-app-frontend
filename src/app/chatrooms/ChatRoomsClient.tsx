"use client";

import ChatRoomList from "@/components/ChatRoomList";
import CreateRoomForm from "@/components/CreateRoomForm";
import { useUserStore } from "@/lib/stores/UserStore";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { useEffect } from "react";
import SkeletonCreateRoomForm from "@/components/ui/Skeletons/SkeletonCreateRoomForm";
import { SkeletonChatRoomList } from "@/components/ui/Skeletons/SkeletonChatRoomList";

export const ChatRoomsClient = () => {
  const router = useRouter();
  const { user } = useUserStore();

  const query = useCurrentUser();
  const isLoading = query.isLoading;

  useEffect(() => {
    if (!isLoading && query.isError && !user) {
      router.push("/signin");
    }
  }, [isLoading, query.isError, user, router]);

  if (isLoading || (!user && !query.isError)) {
    return (
      <div className="flex flex-col gap-y-12 px-4 py-4 w-full h-screen md:max-w-[40rem] mx-auto">
        <SkeletonCreateRoomForm />
        <SkeletonChatRoomList count={3} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-6 p-6  w-full h-fit md:max-w-[60rem] mx-auto">
      <CreateRoomForm />
      <ChatRoomList />
    </div>
  );
};
