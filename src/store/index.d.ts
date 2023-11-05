interface TodoItem {
  title: string,
  date: string,
  text: string
}

interface DateItem {
  date: string,
  show: boolean,
  list: TodoItem[]
}
type Theme = 'dark' | 'light' 