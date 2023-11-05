import { defineStore } from "pinia";
export const useTodoListStore = defineStore({
  id: "todoList",
  state: () => {
    return {
      todoList: [],
    };
  },
  actions: {
    updateTodoList(todoItem) {
      const dateItem = this.todoList?.find(
        (item) => item.date === todoItem.date
      );
      if (dateItem) {
        dateItem.list.push(todoItem);
      } else {
        const dateItem = { date: todoItem.date, list: [], show: true };
        dateItem.list.push(todoItem);
        this.todoList.push(dateItem);
      }
    },
    initTodoList(todoList) {
      debugger
      this.todoList = todoList;
    },
  },
});
