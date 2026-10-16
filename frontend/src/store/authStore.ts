import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  activeRole: UserRole | null;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  activeRole: null,
  setUser: (user) => set({ user, isAuthenticated: !!user, activeRole: user?.role || null }),
  setRole: (role) => set({ activeRole: role }),
  logout: () => set({ user: null, isAuthenticated: false, activeRole: null }),
}));
