import { useMutation } from "@tanstack/react-query";
import api from "@/lib/apiClient";

export function useLogoutUser() {
  return useMutation({
    mutationFn: async () => {
      await api.post("/api/users/logout", null, { withCredentials: true });
    },
  });
}
