import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "@/lib/apiClient";
import { useUserStore } from "@/lib/stores/UserStore";
import { UserResponseDTO } from "../types";

export function useCurrentUser() {
  const setUser = useUserStore((s) => s.setUser);
  const clearAuth = useUserStore((s) => s.clearAuth);

  const query = useQuery<UserResponseDTO>({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await api.get<UserResponseDTO>("/api/users/me", {
        withCredentials: true,
      });
      return res.data;
    },
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
    }
    if (query.isError) {
      clearAuth();
    }
  }, [query.isSuccess, query.isError, query.data, setUser, clearAuth]);

  return query;
}
