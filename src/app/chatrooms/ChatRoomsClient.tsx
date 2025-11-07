"use client";

import ChatRoomList from "@/components/ChatRoomList";
import CreateRoomForm from "@/components/CreateRoomForm";
import { useUserStore } from "@/lib/stores/UserStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const ChatRoomsClient = () => {
  const { user } = useUserStore();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex flex-col items-center text-center justify-center h-screen gap-y-2">
        <h1 className="responsive-h3">
          To create a room, you must be logged in.
        </h1>

        <Button
          size="lg"
          onClick={() => {
            router.push("/signin");
          }}
          className="text-foreground"
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="py-fluid px-fluid flex flex-col w-full md:max-w-[60rem] mx-auto gap-y-12">
      <CreateRoomForm />
      <ChatRoomList />
    </div>
  );
};
