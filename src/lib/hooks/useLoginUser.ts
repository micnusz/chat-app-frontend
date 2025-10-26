import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUserStore } from "@/lib/stores/UserStore";
import api from "@/lib/apiClient";
import { UserRequestDTO, UserResponseDTO, ErrorResponse } from "../types";

export function useLoginUser() {
  const setUser = useUserStore((s) => s.setUser);

  return useMutation<
    UserResponseDTO,
    AxiosError<ErrorResponse>,
    UserRequestDTO
  >({
    mutationFn: async (payload) => {
      const { data } = await api.post<UserResponseDTO>(
        "api/users/login",
        payload,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      setUser(data);
    },
  });
}
