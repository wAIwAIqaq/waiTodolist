import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { ref } from "vue";
export const useThemeStore = defineStore({
  id: "theme",
  state: () => {
    return {
      theme: ref({ themeColor: "dark" }),
    };
  },
  actions: {
    initTheme() {
      /** 构造storage响应式实例 */
      const storageKey = "theme";
      const storage = useStorage(storageKey, { themeColor: "dark" });
      this.theme = storage.value;
      this.toggleTheme(this.theme.themeColor);
    },

    toggleTheme(theme: string) {
      this.theme.themeColor = theme;
      // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      if (
        this.theme.themeColor === "dark" ||
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
