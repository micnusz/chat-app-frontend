import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { loginUser } from "@/lib/api";
import { useUserStore } from "@/lib/stores/UserStore";
import { useRouter } from "next/navigation";
import { ErrorResponse, LoginResponse } from "../types";

interface LoginData {
  username: string;
}

export function useLoginUser() {
  const setAuth = useUserStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginData>({
    mutationFn: async (data) => {
      return await loginUser(data);
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      router.push("/chatrooms");
    },
  });
}
