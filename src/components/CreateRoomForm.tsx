"use client";

import { useState } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { useCreateRoom } from "@/lib/hooks/useCreateRoom";
import { AxiosError } from "axios";
import { ChatRoom } from "@/lib/types";
import { chatRoomSchema } from "@/lib/validation/chatRoomSchema";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Spinner from "./Spinner";

export default function CreateRoomForm() {
  const { user } = useUserStore();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    mutate: createRoom,
    isPending,
    isError,
    error,
    isSuccess,
    data,
  } = useCreateRoom();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      setMessage("You must be logged in to create a room.");
      return;
    }

    const result = chatRoomSchema.safeParse({ name, password });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }
    setValidationError(null);
    setMessage("");

    createRoom(
      { name, password },
      {
        onSuccess: (room: ChatRoom) => {
          setMessage(`Room "${room.name}" has been created!`);
          setName("");
          setPassword("");
        },
        onError: (err) => {
          const axiosErr = err as AxiosError<{ message?: string }>;
          const apiMessage =
            axiosErr.response?.data?.message ||
            "Failed to create a room. Please try again.";
          setMessage(apiMessage);
        },
      }
    );
  };

  const isDisabled = isPending || name === "";

  return (
    <>
      <div className="flex flex-col gap-y-2 justify-center">
        <h1 className="responsive-h4">Create room:</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <Input
            type="text"
            placeholder="Room name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full"
          />
          <Input
            type="password"
            placeholder="Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />

          {validationError && (
            <p className="text-red-500 text-sm">{validationError}</p>
          )}

          <Button
            type="submit"
            disabled={isDisabled}
            variant={isDisabled ? "outline" : "default"}
            className="disabled:opacity-50 "
          >
            {isPending ? (
              <Spinner aria-label="Creating room..." />
            ) : (
              "Create Room"
            )}
          </Button>

          {message && <p className="text-sm">{message}</p>}

          {isError && (
            <p className="text-red-500">
              {(error as AxiosError<{ message?: string }>)?.response?.data
                ?.message ?? error.message}
            </p>
          )}

          {isSuccess && !message && (
            <p className="text-green-600">
              Room `&quot;`{data?.name}`&quot;` has been created!
            </p>
          )}
        </form>
      </div>
    </>
  );
}
