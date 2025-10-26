import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserResponseDTO } from "../types";

interface UserState {
  user: UserResponseDTO | null;
  setUser: (user: UserResponseDTO) => void;
  clearAuth: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearAuth: () => set({ user: null }),
    }),
    { name: "user-storage" }
  )
);
