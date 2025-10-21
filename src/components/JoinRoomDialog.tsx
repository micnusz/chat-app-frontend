"use client";

import { useState, ReactNode, useEffect } from "react";
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
    slug: string;
    name: string;
    requiresPassword?: boolean;
  };
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function JoinRoomDialog({
  room,
  open,
  onClose,
  children,
}: JoinRoomDialogProps) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { mutate: joinRoom } = useJoinRoom(room.id);

  useEffect(() => {
    if (open && !room.requiresPassword) {
      joinRoom(
        {},
        {
          onSuccess: () => {
            onClose();
            router.push(`/chatrooms/${room.slug}`);
          },
          onError: (err: AxiosError<{ message?: string }>) => {
            setErrorMessage(
              err.response?.data?.message || "Failed to join the room."
            );
          },
        }
      );
    }
  }, [open, room, joinRoom, onClose, router]);

  const handleJoin = () => {
    setErrorMessage("");
    joinRoom(
      { password },
      {
        onSuccess: () => {
          onClose();
          router.push(`/chatrooms/${room.slug}`);
        },
        onError: (err: AxiosError<{ message?: string }>) => {
          setErrorMessage(
            err.response?.data?.message || "Failed to join the room."
          );
        },
      }
    );
  };

  if (!room.requiresPassword) return <>{children}</>;

  return (
    <>
      {children}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Join room: {room.name}</DialogTitle>
          </DialogHeader>

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

          {errorMessage && (
            <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
          )}

          <DialogFooter>
            <Button onClick={handleJoin}>Join</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
