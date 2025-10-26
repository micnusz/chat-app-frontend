import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/lib/stores/UserStore";
import api from "@/lib/apiClient";
import { UserResponseDTO } from "../types";

export function useCurrentUser() {
  const setUser = useUserStore((s) => s.setUser);
  const clearAuth = useUserStore.getState().clearAuth;

  return useQuery<UserResponseDTO, Error>({
    queryKey: ["current-user"],
    queryFn: async () => {
      try {
        const res = await api.get<UserResponseDTO>("/api/users/me", {
          withCredentials: true,
        });
        setUser(res.data);
        return res.data;
      } catch (err) {
        clearAuth();
        throw err;
      }
    },
    staleTime: Infinity,
    retry: false,
  });
}
