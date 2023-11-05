<template>
  <div
    class="min-h-[100vh] gap-5 items-start content-start dark:bg-[#18181c] p-10 transition-all"
  >
    <div v-for="dateItem in todoList" :key="dateItem.date">
      <n-divider title-placement="center" class="dark:text-sky-100">
        <div
          class="cursor-pointer flex items-center gap-2"
          @click="dateItem.show = !dateItem.show"
        >
          {{ dayjs(dateItem.date).format("YYYY-MM-DD") }}
          <n-button text type="primary">
            <template #icon>
              <component
                :is="'ion-icon'"
                :name="
                  dateItem.show
                    ? 'chevron-collapse-outline'
                    : 'chevron-expand-outline'
                "
              />
            </template>
          </n-button>
        </div>
      </n-divider>
      <n-collapse-transition :show="dateItem.show">
        <div class="grid grid-cols-8 gap-6">
          <div
            v-for="(item, index) in dateItem.list"
            :key="index"
            class="todo-list-item flex flex-col gap-4 p-4 dark:text-sky-100 border-sky-100 border rounded-lg transition-all cursor-pointer"
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
  </div>
  <div class="fixed flex gap-5 right-5 bottom-5">
    <n-button type="primary" circle @click="readFile">
      <template #icon>
        <ion-icon name="add-sharp"></ion-icon>
      </template>
    </n-button>
    <n-button type="primary" circle @click="writeFile">
      <template #icon>
        <ion-icon name="save-outline"></ion-icon>
      </template>
    </n-button>
    <n-button type="primary" circle @click="toggleTheme">
      切换主题
      {{ themeStore.isDark }}
    </n-button>
  </div>
</template>

<script setup lang="tsx">
import { computed, watch, isRef, defineComponent } from "vue";
import { useTodoListStore } from "@/store/todoList";
import { storeToRefs } from "pinia";
import { CreateOutline as CreateIcon } from "@vicons/ionicons5";
import dayjs from "dayjs";
import { useDialog } from "naive-ui";

import { useThemeStore } from "@/store/theme";

const themeStore = useThemeStore();
const toggleTheme = () => {
  console.log(themeStore.toggleTheme());
};

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

const readFile = async () => {
  if (window.showOpenFilePicker) {
    const fileList = await showOpenFilePicker({
      types: [
        {
          description: "JSON",
          accept: {
            "json/*": [".json"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });
    fileList.forEach(async (item) => {
      const fileData = await item.getFile();
      const text = await fileData.text();
      try {
        const fileJSONObj = JSON.parse(text);
        todoListStore.updateTodoList(fileJSONObj);
      } catch (error) {
        console.error(error);
      }
    });
  }
};

const writeFile = async () => {
  if (window.showOpenFilePicker) {
    const fileList = await showOpenFilePicker({
      types: [
        {
          description: "JSON",
          accept: {
            "json/*": [".json"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });
    fileList.forEach(async (item) => {
      const fileData = await item.getFile();
      const text = await fileData.text();
      const writableStream = await item.createWritable();
      await writableStream.write(JSON.stringify(todoList.value));
      await writableStream.close();
    });
  }
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
