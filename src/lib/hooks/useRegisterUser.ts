import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { registerUser } from "@/lib/api";
import { useUserStore } from "@/lib/stores/UserStore";
import { useRouter } from "next/navigation";
import { ErrorResponse, RegisterResponse } from "../types";

interface RegisterData {
  username: string;
}

export function useRegisterUser() {
  const setAuth = useUserStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation<RegisterResponse, AxiosError<ErrorResponse>, RegisterData>(
    {
      mutationFn: async (data) => {
        return await registerUser(data);
      },
      onSuccess: (data) => {
        setAuth(data.user, data.token);
        router.push("/chatrooms");
      },
    }
  );
}
