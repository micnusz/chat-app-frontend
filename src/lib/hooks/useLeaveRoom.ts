import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "../apiClient";
import { ErrorResponse } from "../types";
import { useRouter } from "next/navigation";

export function useLeaveRoom(roomId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, AxiosError<ErrorResponse>>({
    mutationFn: async () => {
      await api.post(`/api/chat/rooms/${roomId}/leave`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-chat-rooms"] });
      router.push("/chatrooms");
    },
  });
}
