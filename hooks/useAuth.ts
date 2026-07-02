"use client";

import { useAuthStore } from "@/stores/authStore";

export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    isInitialized,
    login,
    signup,
    logout,
    initialize,
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isInitialized,
    login,
    signup,
    logout,
    initialize,
  };
}
