<script setup lang="ts">
import { darkTheme, zhCN, dateZhCN } from "naive-ui";
import {
  createTheme,
  inputDark,
  datePickerDark,
  buttonDark,
  dialogDark,
  scrollbarDark,
  dividerDark
} from "naive-ui";
const darkTheme = createTheme([
  inputDark,
  datePickerDark,
  buttonDark,
  dialogDark,
  scrollbarDark,
  dividerDark
]);
</script>

<template>
  <n-config-provider
    class="h-full w-full overflow-auto"
    :theme="darkTheme"
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
