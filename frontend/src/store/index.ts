import {create} from 'zustand';
import { createAuthStore } from './modules/Auth';
// 创建全局 Store
export const useAppStore = create(createAuthStore);