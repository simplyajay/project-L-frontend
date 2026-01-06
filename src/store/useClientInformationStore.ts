import { create } from "zustand";

interface IClientInformationStore {
  shouldRefresh: boolean;
  setShouldRefresh: (value: boolean) => void;
}

export const useClientInformationStore = create<IClientInformationStore>()((set) => ({
  shouldRefresh: false,
  setShouldRefresh: (value) => set(() => ({ shouldRefresh: value })),
}));
