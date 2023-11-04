import { defineStore } from "pinia";
export const useTodoListStore = defineStore({
  id: "todoList",
  state: () => {
    return {
      todoList: [],
    };
  },
  actions: {
    updateTodoList(list: []) {
      this.todoList.push(...list);
    },
  },
});
