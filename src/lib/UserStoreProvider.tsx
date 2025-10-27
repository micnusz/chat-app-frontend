"use client";
import { useEffect } from "react";
import { UserResponseDTO } from "./types";
import { useUserStore } from "./stores/UserStore";

interface Props {
  children: React.ReactNode;
  initialUser: UserResponseDTO | null;
}

export default function UserStoreProvider({ children, initialUser }: Props) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (initialUser) setUser(initialUser);
  }, [initialUser, setUser]);

  return <>{children}</>;
}
