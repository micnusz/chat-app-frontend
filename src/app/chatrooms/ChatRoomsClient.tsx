"use client";

import ChatRoomList from "@/components/ChatRoomList";
import CreateRoomForm from "@/components/CreateRoomForm";
import { useUserStore } from "@/lib/stores/UserStore";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";

export const ChatRoomsClient = () => {
  const { user } = useUserStore();
  const query = useCurrentUser();
  const isLoading = query.isLoading;
  const router = useRouter();

  if (isLoading || (!user && !query.isError)) {
    return (
      <div className="py-fluid px-fluid flex flex-col gap-y-6 w-full h-screen md:max-w-[60rem] mx-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="py-fluid px-fluid flex flex-col gap-y-6 w-full h-screen md:max-w-[60rem] mx-auto">
      {user ? (
        <>
          <CreateRoomForm />
          <ChatRoomList />
        </>
      ) : (
        <div className="flex flex-col items-center text-center justify-center h-full gap-y-2">
          <h1 className="responsive-h3">
            To create a room, you must be logged in.
          </h1>

          <Button
            size={"lg"}
            onClick={() => {
              router.push("/signin");
            }}
            className="text-foreground"
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};
