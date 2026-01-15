import { create } from "zustand";
import { User } from "@/lib/types/user";

interface IAuthState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useAuthStore = create<IAuthState>()((set) => ({
  user: null,
  setUser: (user: User) => set(() => ({ user })),
}));
