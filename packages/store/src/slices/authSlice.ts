/**
 * Auth Slice - Manages authentication state and current user
 */
import { StateCreator } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Manager' | 'Executive' | 'Sales Rep';
  department: string;
  avatar?: string;
}

export interface AuthSlice {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
});
