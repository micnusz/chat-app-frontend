import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { registerUser } from "@/lib/api";
import { useUserStore } from "@/lib/stores/UserStore";
import { RegisterData, RegisterResponse } from "../types";

export function useRegisterUser() {
  const setAuth = useUserStore((s) => s.setAuth);

  return useMutation<RegisterResponse, AxiosError, RegisterData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
}
