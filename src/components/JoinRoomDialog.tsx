"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useJoinRoom } from "@/lib/hooks/useJoinRoom";
import { AxiosError } from "axios";
import { ChatRoom, ErrorResponse } from "@/lib/types";

interface JoinRoomDialogProps {
  room: ChatRoom;
}

export default function JoinRoomDialog({ room }: JoinRoomDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { mutate: joinRoom } = useJoinRoom(room.id);

  const resetState = () => {
    setPassword("");
    setErrorMessage("");
    setDialogOpen(false);
  };

  const handleJoin = () => {
    setErrorMessage("");

    const payload = room.requiresPassword ? { password } : {};

    joinRoom(payload, {
      onSuccess: () => {
        resetState();
        router.push(`/chatrooms/${room.slug}`);
      },
      onError: (err: AxiosError<ErrorResponse>) => {
        setErrorMessage(
          err.response?.data?.message ?? "Failed to join the room."
        );
      },
    });
  };

  const isDisabled = room.requiresPassword && password.trim() === "";

  return (
    <>
      <Button
        onClick={() => setDialogOpen(true)}
        variant={"default"}
        className="w-fit"
      >
        Join
      </Button>

      <Dialog open={dialogOpen} onOpenChange={resetState}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Join room: {room.name}</DialogTitle>
          </DialogHeader>

          {room.requiresPassword && (
            <div className="my-4 flex flex-col gap-y-1">
              <span className="text-xs text-muted-foreground">Password:</span>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              />
            </div>
          )}

          {errorMessage && (
            <p className="text-red-500 text-xs">{errorMessage}</p>
          )}

          <DialogFooter>
            <Button
              onClick={handleJoin}
              variant={isDisabled ? "muted" : "default"}
              disabled={isDisabled}
            >
              Join
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
