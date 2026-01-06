import { create } from "zustand";

interface IClientState {
  shouldRefresh: boolean;
  setShouldRefresh: (value: boolean) => void;
}

export const useClientStore = create<IClientState>()((set) => ({
  shouldRefresh: false,
  setShouldRefresh: (value) => set(() => ({ shouldRefresh: value })),
}));
