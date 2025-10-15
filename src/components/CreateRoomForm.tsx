"use client";

import { useState } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import api from "@/lib/apiClient";

interface CreateRoomFormProps {
  onRoomCreated?: () => void;
}

export default function CreateRoomForm({ onRoomCreated }: CreateRoomFormProps) {
  const { user } = useUserStore();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setMessage("Musisz być zalogowany, aby utworzyć pokój.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/api/chat/rooms", {
        name,
        password,
      });

      setMessage(`Pokój "${res.data.name}" został utworzony!`);
      setName("");
      setPassword("");

      if (onRoomCreated) onRoomCreated();
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Nie udało się utworzyć pokoju.");
    } finally {
      setLoading(false);
    }
  };

  // Jeśli użytkownik nie jest zalogowany, wyświetlamy komunikat zamiast formularza
  if (!user) {
    return (
      <p className="text-red-500">Musisz być zalogowany, aby utworzyć pokój.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
      <input
        type="text"
        placeholder="Nazwa pokoju"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Hasło (opcjonalnie)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? "Tworzenie..." : "Stwórz pokój"}
      </button>
      {message && <p className="text-sm mt-1">{message}</p>}
    </form>
  );
}
