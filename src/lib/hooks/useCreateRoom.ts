import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { ChatRoom, CreateRoomData, ErrorResponse } from "../types";
import { AxiosError } from "axios";

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation<ChatRoom, AxiosError<ErrorResponse>, CreateRoomData>({
    mutationFn: async (data) => {
      const res = await api.post<ChatRoom>("/api/chat/rooms", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-room-list"] });
    },
  });
}
