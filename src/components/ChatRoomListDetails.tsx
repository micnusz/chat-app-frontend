"use client";

import { ReactNode, useState } from "react";
import { ChatRoom } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar, User, Lock } from "lucide-react";

type ChatRoomListDetailsProps = {
  room: ChatRoom;
};

export default function ChatRoomListDetails({
  room,
}: ChatRoomListDetailsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setDialogOpen(true)} variant={"outline"}>
        More info
      </Button>
      <Dialog open={dialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{room.name}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">
                Created by: {room.createdBy}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">
                Created at:{" "}
                {room.createdAt
                  ? new Date(room.createdAt).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>

            {room.requiresPassword && (
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-destructive" />
                <span className="text-destructive">Protected</span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="default" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
