import { defineStore } from "pinia";
export const useThemeStore = defineStore({
  id: "theme",
  state: () => {
    return {
      isDark: true,
    };
  },
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      if (
        this.isDark === true ||
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
