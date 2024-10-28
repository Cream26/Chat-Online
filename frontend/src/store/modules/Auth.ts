import { StateCreator } from "zustand";
import { AuthStore } from "../../types/auth";
export const createAuthStore: StateCreator<AuthStore> = (set) => ({
  userinfo: null,
  setUserinfo: (userinfo) => set({ userinfo }),
});
