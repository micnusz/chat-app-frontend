"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stores/UserStore";
import { loginUser, registerUser } from "@/lib/api";
import { Button } from "./ui/button";

export default function UserForm({ mode }: { mode: "login" | "register" }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setAuth = useUserStore((s) => s.setAuth);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = { username };
      const data =
        mode === "login"
          ? await loginUser(payload)
          : await registerUser(payload);

      setAuth(data.user, data.token);
      router.push("/chat");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
      <input
        type="text"
        value={username}
        placeholder="Enter username"
        onChange={(e) => setUsername(e.target.value)}
        required
        className="border rounded p-2"
      />
      <Button type="submit" disabled={loading}>
        {loading
          ? mode === "login"
            ? "Signing in..."
            : "Registering..."
          : mode === "login"
          ? "Sign in"
          : "Register"}
      </Button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}
