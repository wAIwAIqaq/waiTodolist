<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { createTheme, inputDark, datePickerDark, buttonDark } from 'naive-ui'
const darkTheme = createTheme([inputDark, datePickerDark, buttonDark])
</script>

<template>
  <n-config-provider class="h-full w-full" :theme="darkTheme" >
    <keep-alive>
      <router-view />
    </keep-alive>
  </n-config-provider>
</template>

<style scoped lang="scss">
#nprogress .bar {
  /* background-color:; */
}
</style>
