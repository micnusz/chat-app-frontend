import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { loginUser } from "@/lib/api";
import { useUserStore } from "@/lib/stores/UserStore";
import { LoginResponse } from "../types";

interface LoginData {
  username: string;
}

export function useLoginUser() {
  const setAuth = useUserStore((s) => s.setAuth);

  return useMutation<LoginResponse, AxiosError, LoginData>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
}
