"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/apiClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JoinRoomDialogProps {
  room: { id: number; name: string; password?: string };
  open: boolean;
  onClose: () => void;
}

export default function JoinRoomDialog({
  room,
  open,
  onClose,
}: JoinRoomDialogProps) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleJoin = async () => {
    setLoading(true);
    setError("");

    try {
      await api.post(`/api/chat/rooms/${room.id}/join`, { password });
      onClose();
      router.push(`/chatrooms/${room.id}`);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Nie udało się dołączyć do pokoju"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Dołącz do pokoju {room.name}</DialogTitle>
        </DialogHeader>

        {room.requiresPassword && (
          <div className="my-4">
            <Input
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <DialogFooter>
          <Button onClick={handleJoin} disabled={loading}>
            {loading ? "Dołączanie..." : "Dołącz"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
