"use client";

import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useThemeStore } from "@/stores/themeStore";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const { initialize } = useAuth();
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <>{children}</>;
};
