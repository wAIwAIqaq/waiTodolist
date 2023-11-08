<script setup lang="ts">
import { useThemeStore } from "@/store/theme";

import {
  zhCN,
  dateZhCN,
  createTheme,
  inputDark,
  datePickerDark,
  buttonDark,
  dialogDark,
  scrollbarDark,
  dividerDark,
  cardDark,
} from "naive-ui";

const themeStore = useThemeStore();

const darkTheme = createTheme([
  inputDark,
  datePickerDark,
  buttonDark,
  dialogDark,
  scrollbarDark,
  dividerDark,
  cardDark,
]);
</script>

<template>
  <n-config-provider
    class="h-full w-full overflow-auto"
    :theme="themeStore.theme.themeColor === 'dark' ? darkTheme : undefined"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-scrollbar>
      <n-dialog-provider>
        <keep-alive>
          <router-view />
        </keep-alive>
      </n-dialog-provider>
    </n-scrollbar>
  </n-config-provider>
</template>

<style scoped lang="scss">
#nprogress .bar {
  /* background-color:; */
}
</style>
