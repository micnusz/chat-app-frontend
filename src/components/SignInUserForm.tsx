"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLoginUser } from "@/lib/hooks/useLoginUser";
import { userSchema } from "@/lib/validation/userSchema";
import { Input } from "./ui/input";
import { useUserStore } from "@/lib/stores/UserStore";

export default function SignInUserForm() {
  const [username, setUsername] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const router = useRouter();
  const loginMutation = useLoginUser();

  const setAuth = useUserStore((s) => s.setAuth);
  const token = useUserStore((s) => s.token);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse({ username });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    setValidationError(null);
    loginMutation.mutate(
      { username },
      {
        onSuccess: (data) => {
          setAuth(data.user, data.token);
        },
      }
    );
  };

  useEffect(() => {
    if (token) router.push("/chatrooms");
  }, [token, router]);

  const isLoading = loginMutation.isPending;
  const errorMessage =
    loginMutation.error?.response?.data?.message || "Unexpected error occurred";

  return (
    <div className="flex flex-col items-center mt-24">
      <h2 className="text-xl font-bold mb-4">Sign in</h2>

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
        {loginMutation.isError && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/signup")}
        className="mt-4 text-sm text-blue-500 underline"
      >
        Don&apos;t have an account? Register
      </Button>
    </div>
  );
}
