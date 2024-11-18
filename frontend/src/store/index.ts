import { create } from 'zustand';
import { createAuthStore } from './modules/Auth';
import { createChatSlice } from './modules/Chat';

type AppState = ReturnType<typeof createAuthStore> & ReturnType<typeof createChatSlice>;

export const useAppStore = create<AppState>((...a) => ({
  ...createAuthStore(...a),
  ...createChatSlice(...a),
}));