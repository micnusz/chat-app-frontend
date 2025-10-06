import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserResponseDTO } from "../types";

interface UserState {
  user: UserResponseDTO | null;
  setUser: (user: UserResponseDTO) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: "user-storage" }
  )
);
