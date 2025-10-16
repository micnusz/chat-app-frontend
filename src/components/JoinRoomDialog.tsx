"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useJoinRoom } from "@/lib/hooks/useJoinRoom";
import { AxiosError } from "axios";

interface JoinRoomDialogProps {
  room: {
    id: number;
    name: string;
    password?: string;
    requiresPassword?: boolean;
  };
  open: boolean;
  onClose: () => void;
}

export default function JoinRoomDialog({
  room,
  open,
  onClose,
}: JoinRoomDialogProps) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const { mutate: joinRoom } = useJoinRoom(room.id);

  const handleJoin = () => {
    setErrorMessage("");

    joinRoom(
      { password },
      {
        onSuccess: () => {
          onClose();
          router.push(`/chatrooms/${room.id}`);
        },
        onError: (err: AxiosError<{ message?: string }>) => {
          setErrorMessage(
            err.response?.data?.message || "Failed to join the room."
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
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
            />
          </div>
        )}

        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}

        <DialogFooter>
          <Button onClick={handleJoin}>Join</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
