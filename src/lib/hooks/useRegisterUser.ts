import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { registerUser } from "@/lib/api";
import { useUserStore } from "@/lib/stores/UserStore";
import { UserResponseDTO } from "../types";

interface RegisterData {
  username: string;
}

interface RegisterResponse {
  user: UserResponseDTO;
  token: string;
}

export function useRegisterUser() {
  const setAuth = useUserStore((s) => s.setAuth);

  return useMutation<RegisterResponse, AxiosError, RegisterData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
}
