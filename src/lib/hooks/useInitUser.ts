import { useEffect } from "react";
import api from "../apiClient";
import { useUserStore } from "../stores/UserStore";
import { UserResponseDTO } from "../types";

export function useInitUser() {
  const setUser = useUserStore((state) => state.setUser);
  const clearAuth = useUserStore((state) => state.clearAuth);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await api.get<UserResponseDTO>("/api/users/me");
        setUser(res.data);
      } catch (err) {
        console.warn(err);
        clearAuth();
      }
    };

    fetchCurrentUser();
  }, [setUser, clearAuth]);
}
