<template>
  <div class="min-h-[100vh] gap-5 items-start content-start bg-[#18181c] p-10">
    <n-divider title-placement="center" class="text-sky-100">
      {{ dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss") }}
      <n-button text type="primary" @click="show = !show">
        <template #icon>
          <component
            :is="'ion-icon'"
            :name="show ? 'chevron-collapse-outline' : 'chevron-expand-outline'"
          />
        </template>
      </n-button>
    </n-divider>
    <n-collapse-transition :show="show">
      <div class="grid grid-cols-8 gap-6">
        <div
          v-for="(item, index) in todoList"
          :key="index"
          class="todo-list-item flex flex-col gap-4 p-4 text-sky-100 border-sky-100 border rounded-lg transition-all cursor-pointer"
          @click="showItemDetail(item)"
        >
          <div
            class="item-title flex w-[200px] justify-between gap-3 text-2xl transition-all"
          >
            {{ item.title }}
          </div>
          <div>{{ dayjs(item.date).format("YYYY-MM-DD HH:mm:ss") }}</div>
          <div>{{ item.text }}</div>
        </div>
      </div>
    </n-collapse-transition>
  </div>
</template>

<script setup lang="tsx">
import { computed, watch, isRef, defineComponent } from "vue";
import { useTodoListStore } from "@/store/todoList";
import { storeToRefs } from "pinia";
import { CreateOutline as CreateIcon } from "@vicons/ionicons5";
import dayjs from "dayjs";
import { useDialog } from "naive-ui";

const show = ref(true);

defineComponent({
  CreateIcon,
});
const todoListStore = useTodoListStore();
const { todoList } = storeToRefs(todoListStore);
const dialog = useDialog();
const showModal = ref(false);
const showItemDetail = (item) => {
  const changedItem = ref({ ...item });
  const isChanged = ref(false);
  dialog.create({
    title: item.title,
    autoFocus: true,
    showIcon: false,
    content: () => {
      return (
        <div class="flex flex-col gap-4 justify-start items-start w-full h-full">
          <div class="flex w-[200px] justify-between gap-3 text-sky-100 text-2xl">
            <n-input
              v-model:value={changedItem.value.title}
              placeholder={"取个啥标题呢?"}
              onInput={() =>
                (isChanged.value = validateChanged(changedItem.value, item))
              }
            />
          </div>
          <n-date-picker
            v-model:value={changedItem.value.date}
            type={"datetime"}
            onConfirm={() =>
              (isChanged.value = validateChanged(changedItem.value, item))
            }
          />
          <n-input
            spellCheck={false}
            v-model:value={changedItem.value.text}
            type={"textarea"}
            placeholder={"要干嘛呢？"}
            onInput={() =>
              (isChanged.value = validateChanged(changedItem.value, item))
            }
            autosize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </div>
      );
    },

    action: () => {
      return (
        <n-button
          disabled={!isChanged.value}
          onClick={() => {
            changeTodoListItem(changedItem);
          }}
        >
          保存它
        </n-button>
      );
    },
  });
};

const validateChanged = (changedItem, item) => {
  let isChanged = false;
  for (const key in changedItem) {
    if (changedItem[key] !== item[key]) {
      isChanged = true;
      break;
    }
  }
  return isChanged;
};

const changeTodoListItem = (changedItem) => {
  dialog.destroyAll();
  console.log("changeItem", changedItem);
};
</script>

<style scoped lang="scss">
$activeColor: #7fe7c4;
.todo-list-item {
  display: flex;
  flex: column;
  border: 1px solid $activeColor;
  &:hover {
    box-shadow: 0 0 10px $activeColor;
    .item-title {
      text-shadow: 0 0 10px $activeColor;
    }
  }
}
</style>