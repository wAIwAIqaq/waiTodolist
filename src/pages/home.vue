<template>
  <div
    class="flex relative justify-center items-center min-w-[100vw] min-h-[100vh] overflow-auto bg-[#18181c] p-2"
  >
    <h1 class="title animate-bounce" @click="toTodoList">
      <span
        v-for="(item, index) in titleChar"
        :key="index"
        :style="`animation-delay: ${(index + 1) * 0.3}s`"
        >{{ item }}</span
      >
    </h1>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import ColorfulBg from "@/components/ColorfulBg.vue";
import { useRouter } from "vue-router";
defineComponent({
  ColorfulBg,
});

const title = "wAI TodoList...";
const titleChar = computed(() => {
  return title.split("");
});

const router = useRouter();
const toTodoList = () => {
  router.push({ path: "todoList" });
};
</script>

<style scoped lang="scss">
.title {
  font-size: 60px;
  color: #000;
  z-index: 1;
  cursor: pointer;
  user-select: none;
  span {
    animation: animate 4.2s linear infinite;
  }
  transition: all 0.3s linear;
  @keyframes animate {
    0%,
    80% {
      color: #000;
      box-shadow: none;
    }
    100% {
      color: #fff;
      text-shadow:
        0 0 10px #fff,
        0 0 20px #fff,
        0 0 40px #fff,
        0 0 80px #fff,
        0 0 160px #fff,
        0 0 320px #fff;
    }
  }
}
</style>
