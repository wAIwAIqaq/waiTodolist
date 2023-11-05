import { defineStore } from "pinia";
export const useThemeStore = defineStore({
  id: "theme",
  state: () => {
    return {
      theme: 'dark',
    };
  },
  actions: {
    toggleTheme(theme) {
      this.theme = theme;
      // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      if (
        this.theme === 'dark' ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});
