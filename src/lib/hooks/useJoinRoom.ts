import { useMutation } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { AxiosError } from "axios";
import { ErrorResponse } from "../types";

interface JoinRoomData {
  password?: string;
}

export function useJoinRoom(roomId: number) {
  return useMutation<void, AxiosError<ErrorResponse>, JoinRoomData>({
    mutationFn: async (data) => {
      await api.post(`/api/chat/rooms/${roomId}/join`, data);
    },
  });
}
