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
    },
  },
});
