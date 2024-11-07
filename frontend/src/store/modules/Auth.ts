import { StateCreator } from "zustand";
import { AuthStore, UserInfo } from "../../types/Auth";
export const createAuthStore: StateCreator<AuthStore> = (set) => ({
  userinfo: null,
  setUserinfo: (userinfo) => set({ userinfo }),
});
