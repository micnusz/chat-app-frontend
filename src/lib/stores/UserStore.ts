import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserResponseDTO } from "../types";

interface UserState {
  user: UserResponseDTO | null;
  token: string | null;
  setAuth: (user: UserResponseDTO, token: string) => void;
  clearAuth: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    { name: "user-storage" }
  )
);
