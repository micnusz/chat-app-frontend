"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteChatRoom } from "@/lib/hooks/useDeleteChatRoom";
import { AxiosError } from "axios";
import Spinner from "./Spinner";

type DeleteRoomDialogProps = {
  roomId: number;
  open: boolean;
  onClose: () => void;
  onDeleted?: () => void;
};

export default function DeleteRoomDialog({
  roomId,
  open,
  onClose,
  onDeleted,
}: DeleteRoomDialogProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate: deleteRoom, isPending } = useDeleteChatRoom(roomId);

  const handleDelete = () => {
    setErrorMessage("");
    deleteRoom(undefined, {
      onSuccess: () => {
        onClose();
        if (onDeleted) onDeleted();
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        setErrorMessage(
          err.response?.data?.message || "Failed to delete room."
        );
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-md">
            Are you sure you want to delete this room?
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          This action cannot be undone.
        </p>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <DialogFooter className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? <Spinner aria-label="Deleting..." /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
