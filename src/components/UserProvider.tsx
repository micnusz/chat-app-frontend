"use client";

import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { UserResponseDTO } from "@/lib/types";

interface UserProviderProps {
  initialUser: UserResponseDTO | null;
  children: ReactNode;
}

export function UserProvider({ initialUser, children }: UserProviderProps) {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser, setUser]);

  return <>{children}</>;
}
