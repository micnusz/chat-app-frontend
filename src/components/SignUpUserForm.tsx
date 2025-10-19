"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useRegisterUser } from "@/lib/hooks/useRegisterUser";
import { userSchema } from "@/lib/validation/userSchema";
import { Input } from "./ui/input";

export default function SignUpUserForm() {
  const [username, setUsername] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const registerMutation = useRegisterUser();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse({ username });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    setValidationError(null);
    registerMutation.mutate({ username });
  };

  const isLoading = registerMutation.isPending;
  const errorMessage =
    registerMutation.error?.response?.data?.message ||
    "Unexpected error occurred";

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
        {registerMutation.isError && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
