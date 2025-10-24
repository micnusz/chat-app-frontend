import { useMutation } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { AxiosError } from "axios";
import { ErrorResponse } from "../types";

export function useJoinRoom(roomId: number) {
  return useMutation<void, AxiosError<ErrorResponse>, { password?: string }>({
    mutationFn: async (data) => {
      await api.post(`/api/chat/rooms/${roomId}/join`, data);
    },
  });
}
