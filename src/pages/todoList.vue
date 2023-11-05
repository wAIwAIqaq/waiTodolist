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
            <div>{{ dayjs(item.date).format("YYYY-MM-DD") }}</div>
            <div>{{ item.text }}</div>
          </div>
        </div>
      </n-collapse-transition>
    </div>
  </div>
  <div class="fixed flex gap-5 right-5 bottom-5">
    <n-button type="primary" circle @click="showItemDetail()">
      <template #icon>
        <ion-icon name="add-sharp"></ion-icon>
      </template>
    </n-button>
    <n-button type="primary" circle @click="readFile">
      <template #icon>
        <ion-icon name="reader-outline"></ion-icon>
      </template>
    </n-button>
    <n-button type="primary" circle @click="writeFile">
      <template #icon>
        <ion-icon name="save-outline"></ion-icon>
      </template>
    </n-button>
    <n-button type="primary" circle @click="toggleTheme"> 
      <template #icon>
        <ion-icon name="contrast-outline"></ion-icon>
      </template>
    </n-button>
  </div>
</template>

<script setup lang="tsx">
import { computed, watch, isRef, defineComponent, onMounted } from "vue";
import { useTodoListStore } from "@/store/todoList";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { useDialog } from "naive-ui";

import { useThemeStore } from "@/store/theme";

const themeStore = useThemeStore();

const toggleTheme = () => {
  if (themeStore.theme === "dark") {
    themeStore.toggleTheme("light");
  } else {
    themeStore.toggleTheme("dark");
  }
};

onMounted(() => {
  themeStore.toggleTheme("dark");
});

const show = ref(true);

const todoListStore = useTodoListStore();
const { todoList } = storeToRefs(todoListStore);
const dialog = useDialog();
const showModal = ref(false);
const showItemDetail = (
  item = { title: "", date: new Date().valueOf(), text: "" }
) => {
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
              onInput={(val) =>
                (isChanged.value = validateChanged(val, item.title))
              }
            />
          </div>
          <n-date-picker
            v-model:value={changedItem.value.date}
            type={"date"}
            format="yyyy-MM-dd"
            on-update:value={(val) => {
              isChanged.value = validateChanged(val, item.date);
            }}
          />
          <n-input
            spellCheck={false}
            v-model:value={changedItem.value.text}
            type={"textarea"}
            placeholder={"要干嘛呢？"}
            onInput={(val) =>
              (isChanged.value = validateChanged(val, item.text))
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
            changeItemHandler(changedItem);
          }}
        >
          保存它
        </n-button>
      );
    },
  });
};

const validateChanged = (val, oldVal) => {
  console.log(val, oldVal);
  return val !== oldVal;
};

const changeItemHandler = (changedItem) => {
  dialog.destroyAll();
  todoListStore.updateTodoList(changedItem.value);
};

const isUrgent = (time) => {
  console.log(time);
  return true;
};

const isPassed = (time) => {
  return new Date().valueOf() - time > 0 ? true : false;
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
        todoListStore.initTodoList(fileJSONObj);
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
.todo-list-item {
  $activeColor: #7fe7c4;
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
