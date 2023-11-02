<template>
  <div
    class="flex relative justify-center items-center w-full h-full bg-[#282c34] p-2"
  >
    <div
      v-for="(item, index) in todoList"
      :key="index"
      class="flex flex-col gap-4 p-4 border-sky-100 border rounded-lg hover:border-[#7fe7c4] transition-all"
    >
      <div class="flex w-[200px] justify-between gap-3 text-sky-100 text-2xl">
        <div v-if="!item.editable.title">{{ item.title }}</div>
        <n-input v-else v-model:value="item.title"></n-input>
        <n-button text @click="item.editable.title = !item.editable.title">
          <template #icon>
            <n-icon>
              <create-icon />
            </n-icon>
          </template>
        </n-button>
      </div>
      <n-date-picker v-model:value="item.date" type="date" />
      <n-input
        v-model:value="item.text"
        type="textarea"
        placeholder="要干嘛呢？"
        :autosize="{
          minRows: 3,
          maxRows: 5,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent } from "vue";
import { useTodoListStore } from "@/store/todoList";
import { storeToRefs } from "pinia";
import { CreateOutline as CreateIcon } from "@vicons/ionicons5";

defineComponent({
  CreateIcon,
});
const todoListStore = useTodoListStore();
const { todoList } = storeToRefs(todoListStore);
console.log("todoList", storeToRefs(todoListStore));
</script>

<style scoped></style>
