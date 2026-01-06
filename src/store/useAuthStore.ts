import { create } from "zustand";
import { IUser } from "@/lib/types/user";

interface IAuthState {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export const useAuthStore = create<IAuthState>()((set) => ({
  user: null,
  setUser: (user: IUser) => set(() => ({ user })),
}));
