import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  type AppTheme,
} from "@/constants/theme";

const THEME_EVENT_NAME = "elosaude:theme-change";

export function getThemeScript() {
  return `
    (() => {
      try {
        const storedTheme = localStorage.getItem("${THEME_STORAGE_KEY}");
        const theme = storedTheme === "dark" || storedTheme === "light"
          ? storedTheme
          : "${DEFAULT_THEME}";
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.dataset.theme = theme;
      } catch {
        document.documentElement.classList.toggle("dark", false);
        document.documentElement.dataset.theme = "${DEFAULT_THEME}";
      }
    })();
  `;
}

export function getThemeSnapshot(): AppTheme {
  if (typeof document === "undefined") {
    return DEFAULT_THEME;
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function subscribeTheme(listener: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === THEME_STORAGE_KEY) {
      listener();
    }
  };

  window.addEventListener(THEME_EVENT_NAME, listener as EventListener);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(THEME_EVENT_NAME, listener as EventListener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function setTheme(theme: AppTheme) {
  if (typeof window === "undefined") {
    return;
  }

  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  window.dispatchEvent(new Event(THEME_EVENT_NAME));
}

