"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stores/UserStore";
import { UserRequestDTO } from "@/lib/types";
import { loginUser, registerUser } from "@/lib/api";

interface Props {
  mode: "login" | "register";
}

export default function UserForm({ mode }: Props) {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const payload: UserRequestDTO = { username };

    try {
      const user =
        mode === "login"
          ? await loginUser(payload)
          : await registerUser(payload);

      setUser(user);
      router.push("/chat");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        placeholder="Podaj nazwę użytkownika"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit">
        {mode === "login" ? "Zaloguj" : "Zarejestruj"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
