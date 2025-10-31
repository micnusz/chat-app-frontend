"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { useRegisterUser } from "@/lib/hooks/useRegisterUser";
import { userSchema } from "@/lib/validation/userSchema";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/lib/types";
import Spinner from "./Spinner";

export default function SignUpUserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const router = useRouter();

  const registerMutation = useRegisterUser();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse({ username, password });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }
    setValidationError(null);

    registerMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          router.push("/chatrooms");
        },
      }
    );
  };

  const isPending = registerMutation.isPending;

  const errorMessage =
    (registerMutation.error as AxiosError<ErrorResponse>)?.response?.data
      ?.message ||
    (registerMutation.error as AxiosError)?.message ||
    null;

  const isDisabled = !username.trim() || !password.trim() || isPending;

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
        <Input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2"
        />
        {validationError && (
          <div className="text-red-500 text-sm">{validationError}</div>
        )}
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
        <Button type="submit" disabled={isDisabled} className="text-foreground">
          {isPending ? (
            <>
              <Spinner aria-label="Registering..." />
              <span className="sr-only">Registering...</span>
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>

      <Button
        variant="link"
        size="sm"
        onClick={() => router.push("/signin")}
        className="mt-2 text-sm text-foreground"
      >
        Already have an account? Sign in
      </Button>
    </div>
  );
}
