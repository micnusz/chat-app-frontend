import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUserStore } from "@/lib/stores/UserStore";
import api from "@/lib/apiClient";
import { AuthResponse, UserRequestDTO, ErrorResponse } from "../types";

export function useRegisterUser() {
  const setUser = useUserStore((s) => s.setUser);

  return useMutation<AuthResponse, AxiosError<ErrorResponse>, UserRequestDTO>({
    mutationFn: async (payload) => {
      const { data } = await api.post<AuthResponse>(
        "api/users/register",
        payload
      );
      return data;
    },
    onSuccess: (data) => setUser(data.user),
  });
}
