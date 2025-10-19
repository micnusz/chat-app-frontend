"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { useRegisterUser } from "@/lib/hooks/useRegisterUser";
import { userSchema } from "@/lib/validation/userSchema";
import { useUserStore } from "@/lib/stores/UserStore";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/lib/types";

export default function SignUpUserForm() {
  const [username, setUsername] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const router = useRouter();
  const token = useUserStore((s) => s.token);
  const setAuth = useUserStore((s) => s.setAuth);

  const registerMutation = useRegisterUser();

  useEffect(() => {
    if (token) router.push("/chatrooms");
  }, [token, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse({ username });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    setValidationError(null);

    registerMutation.mutate(
      { username },
      {
        onSuccess: (data) => {
          setAuth(data.user, data.token);
        },
      }
    );
  };

  const isLoading = registerMutation.isLoading;
  const errorMessage =
    (registerMutation.error as AxiosError<ErrorResponse>)?.response?.data
      ?.message ||
    (registerMutation.error as AxiosError)?.message ||
    null;

  return (
    <div className="flex flex-col items-center mt-24">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
        <Input
          type="text"
          value={username}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2"
        />

        {validationError && (
          <div className="text-red-500 text-sm">{validationError}</div>
        )}
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/signin")}
        className="mt-4 text-sm text-blue-500 underline"
      >
        Already have an account? Sign in
      </Button>
    </div>
  );
}
