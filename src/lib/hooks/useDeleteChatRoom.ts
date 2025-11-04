import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../types";
import api from "../apiClient";
import { useRouter } from "next/navigation";

export function useDeleteChatRoom(roomId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, AxiosError<ErrorResponse>>({
    mutationFn: async () => {
      await api.delete(`/api/chat/rooms/${roomId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-room-list"] });
      router.push("/chatrooms");
    },
  });
}
