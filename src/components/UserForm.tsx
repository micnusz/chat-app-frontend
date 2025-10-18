"use client";

import { useState, FormEvent } from "react";
import { Button } from "./ui/button";
import { useLoginUser } from "@/lib/hooks/useLoginUser";
import { useRegisterUser } from "@/lib/hooks/useRegisterUser";
import { userSchema } from "@/lib/validation/userSchema";

export default function UserForm() {
  const [username, setUsername] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [validationError, setValidationError] = useState<string | null>(null);

  const loginMutation = useLoginUser();
  const registerMutation = useRegisterUser();
  const mutation = mode === "login" ? loginMutation : registerMutation;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse({ username });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    setValidationError(null);
    mutation.mutate({ username });
  };

  const isLoading = mutation.isPending;
  const errorMessage =
    mutation.error?.response?.data?.message || "Unexpected error occurred";

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
          className="border rounded p-2"
        />

        {validationError && (
          <div className="text-red-500 text-sm">{validationError}</div>
        )}
        {mutation.isError && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? mode === "login"
              ? "Signing in..."
              : "Registering..."
            : mode === "login"
            ? "Sign in"
            : "Register"}
        </Button>
      </form>

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
