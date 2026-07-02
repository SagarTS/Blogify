import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
}

interface ThemeActions {
  toggleTheme: () => void;
}

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("blogify_theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem("blogify_theme", theme);
};

export const useThemeStore = create<ThemeState & ThemeActions>((set) => ({
  theme: getInitialTheme(),

  toggleTheme: () => {
    set((state) => {
      const next = state.theme === "light" ? "dark" : "light";
      applyTheme(next);
      return { theme: next };
    });
  },
}));
