"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stores/UserStore";
import { loginUser, registerUser } from "@/lib/api";
import { Button } from "./ui/button";

export default function UserForm() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login"); // default login
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
    <div className="flex flex-col items-center mt-24">
      <h2 className="text-xl font-bold mb-4">
        {mode === "login" ? "Sign in" : "Register"}
      </h2>
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

      {/* Toggle button */}
      <button
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        className="mt-4 text-sm text-blue-500 underline"
      >
        {mode === "login"
          ? "Don't have an account? Register"
          : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
