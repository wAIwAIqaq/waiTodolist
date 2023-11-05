import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { ref } from "vue";
export const useTodoListStore = defineStore({
  id: "todoList",
  state: () => {
    return {
      todoList: ref([] as DateItem[]),
    };
  },
  actions: {
    updateTodoList(todoItem: TodoItem) {
      const dateItem = this.todoList?.find(
        (item) => item.date === todoItem.date
      );
      if (dateItem) {
        dateItem.list.push(todoItem);
      } else {
        const dateItem = {
          date: todoItem.date,
          list: [] as TodoItem[],
          show: true,
        };
        dateItem.list.push(todoItem);
        this.todoList.push(dateItem);
      }
    },
    initTodoList(todoList: DateItem[] = []) {
      /** 构造storage响应式实例 */
      const storageKey = "todoList";
      const storage = useStorage(storageKey, todoList);
      this.todoList = storage.value;
    },
    readTodoList(todoList: DateItem[]) {
      todoList.forEach((item) => {
        this.todoList.push(item);
      });
    },
  },
});
