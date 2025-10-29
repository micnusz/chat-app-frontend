"use client";

import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

export function UserProvider({ children }: { children: React.ReactNode }) {
  useCurrentUser();
  return children;
}
