import { create } from "zustand";

interface IClientListState {
  shouldRefresh: boolean;
  setShouldRefresh: (value: boolean) => void;
}

export const useClientListStore = create<IClientListState>()((set) => ({
  shouldRefresh: false,
  setShouldRefresh: (value) => set(() => ({ shouldRefresh: value })),
}));
