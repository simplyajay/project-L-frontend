import { create } from "zustand";

type RefreshKey = "clientList" | "clientInfo";

interface RefreshState {
  refreshMap: Record<RefreshKey, boolean>;
  triggerRefresh: (key: RefreshKey) => void;
  resetRefresh: (key: RefreshKey) => void;
}

export const useRefreshStore = create<RefreshState>((set) => ({
  refreshMap: {
    clientInfo: false,
    clientList: false,
  },

  triggerRefresh: (key) => set((state) => ({ refreshMap: { ...state.refreshMap, [key]: true } })),

  resetRefresh: (key) => set((state) => ({ refreshMap: { ...state.refreshMap, [key]: false } })),
}));
