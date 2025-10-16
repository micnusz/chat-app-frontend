"use client";

import { useState } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { useCreateRoom } from "@/lib/hooks/useCreateRoom";
import { AxiosError } from "axios";
import { ChatRoom } from "@/lib/types";

export default function CreateRoomForm() {
  const { user } = useUserStore();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const {
    mutate: createRoom,
    isPending,
    isError,
    error,
    isSuccess,
    data,
  } = useCreateRoom();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setMessage("You must be logged in to create a room.");
      return;
    }

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

  if (!user) {
    return (
      <p className="text-red-500">You must be logged in to create a room.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
      <input
        type="text"
        placeholder="Room name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password (optional)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Room"}
      </button>

      {message && <p className="text-sm mt-1">{message}</p>}

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
  );
}
