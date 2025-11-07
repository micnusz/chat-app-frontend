import { create } from "zustand";
import { UserResponseDTO } from "../types";

interface UserStore {
  user: UserResponseDTO | null;
  setUser: (user: UserResponseDTO | null) => void;
  clearAuth: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearAuth: () => set({ user: null }),
}));
