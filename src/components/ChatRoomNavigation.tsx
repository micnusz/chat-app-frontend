"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useLeaveRoom } from "@/lib/hooks/useLeaveRoom";
import { useUserStore } from "@/lib/stores/UserStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import DeleteRoomDialog from "./DeleteRoomDialog";

type ChatRoomNavigationProps = {
  roomId: number;
  createdBy: string;
  onClose?: () => void;
};

export default function ChatRoomNavigation({
  roomId,
  createdBy,
  onClose,
}: ChatRoomNavigationProps) {
  const { user } = useUserStore();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    mutate: leaveRoom,
    isError: leaveError,
    error: leaveErrorData,
  } = useLeaveRoom(roomId);

  const handleLeave = () => {
    leaveRoom(undefined, {
      onSuccess: () => {
        if (onClose) onClose();
      },
      onError: (err) => {
        console.error(
          err.response?.data?.message || "Failed to leave the room."
        );
      },
    });
  };

  return (
    <div className="flex flex-row gap-x-2">
      <Button variant="destructive" onClick={handleLeave}>
        Exit
      </Button>

      {user?.username === createdBy && (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-muted-foreground">
                More Options
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setConfirmOpen(true)}
                className="text-red-400"
              >
                Delete Room
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <DeleteRoomDialog
        roomId={roomId}
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onDeleted={onClose}
      />

      {leaveError && (
        <div className="text-red-500 text-sm">
          {leaveErrorData?.response?.data?.message || "Error leaving room."}
        </div>
      )}
    </div>
  );
}
