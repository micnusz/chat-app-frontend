import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { useUserStore } from "@/lib/stores/UserStore";

export function useLogoutUser() {
  const clearAuth = useUserStore((s) => s.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post("/api/users/logout", null, { withCredentials: true });
    },
    onSuccess: () => {
      clearAuth();
      queryClient.removeQueries({ queryKey: ["current-user"] });
    },
  });
}
