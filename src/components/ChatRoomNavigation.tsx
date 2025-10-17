"use client";

import { Button } from "./ui/button";
import { useDeleteChatRoom } from "@/lib/hooks/useDeleteChatRoom";
import { useLeaveRoom } from "@/lib/hooks/useLeaveRoom";

type ChatRoomNavigationProps = {
  roomId: number;
  onClose?: () => void;
};

export default function ChatRoomNavigation({
  roomId,
  onClose,
}: ChatRoomNavigationProps) {
  const {
    mutate: deleteRoom,
    isError: deleteError,
    error: deleteErrorData,
  } = useDeleteChatRoom(roomId);

  const {
    mutate: leaveRoom,
    isError: leaveError,
    error: leaveErrorData,
  } = useLeaveRoom(roomId);

  const handleDelete = () => {
    deleteRoom(undefined, {
      onSuccess: () => {
        if (onClose) onClose();
      },
      onError: (err) => {
        console.error(
          err.response?.data?.message || "Failed to delete the room."
        );
      },
    });
  };

  const handleLeave = () => {
    leaveRoom(undefined, {
      onSuccess: () => {
        if (onClose) onClose();
        // router.push("/chatrooms") jest już w hooku
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
      <Button variant="outline" onClick={handleLeave}>
        Exit
      </Button>

      <Button variant="destructive" onClick={handleDelete}>
        Delete Room
      </Button>

      {deleteError && (
        <div className="text-red-500 text-sm">
          {deleteErrorData?.response?.data?.message || "Error deleting room."}
        </div>
      )}

      {leaveError && (
        <div className="text-red-500 text-sm">
          {leaveErrorData?.response?.data?.message || "Error leaving room."}
        </div>
      )}
    </div>
  );
}
