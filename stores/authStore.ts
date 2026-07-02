import {
  clearAuthState,
  getAuthState,
  loginUser,
  signUpUser,
  type User,
} from "@/lib/auth";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  initialize: () => void;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,

  initialize: () => {
    const { user, token } = getAuthState();

    set({
      user,
      token,
      isAuthenticated: !!(user && token),
      isInitialized: true,
    });
  },

  login: (email: string, password: string) => {
    const { user, token } = loginUser(email, password);
    set({ user, token, isAuthenticated: true });
  },

  signup: (name: string, email: string, password: string) => {
    const { user, token } = signUpUser(name, email, password);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    clearAuthState();
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
