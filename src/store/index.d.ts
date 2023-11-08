interface TodoItem {
  title: string,
  date: number,
  text: string
}

interface DateItem {
  date: number,
  show: boolean,
  list: TodoItem[]
}
type Theme = 'dark' | 'light' 