"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { useUserStore } from "@/lib/stores/UserStore";
import { AuthResponse } from "../types";
import { useEffect } from "react";

export function useCurrentUser() {
  const setUser = useUserStore((s) => s.setUser);

  const query = useQuery<AuthResponse>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.get<AuthResponse>("/api/users/me");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });
  useEffect(() => {
    if (query.data) {
      setUser(query.data.user);
    }
  }, [query.data, setUser]);

  return query;
}
