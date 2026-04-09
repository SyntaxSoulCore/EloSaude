"use client";

import { useSyncExternalStore } from "react";

import { DEFAULT_THEME, type AppTheme } from "@/constants/theme";
import { getThemeSnapshot, setTheme, subscribeTheme } from "@/lib/theme";

export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => {
    return DEFAULT_THEME;
  });

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function updateTheme(nextTheme: AppTheme) {
    setTheme(nextTheme);
  }

  return {
    theme,
    isDark: theme === "dark",
    toggleTheme,
    setTheme: updateTheme,
  };
}

