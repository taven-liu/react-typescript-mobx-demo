import { types, destroy, IAnyModelType } from 'mobx-state-tree'

import Todo, { TodoType } from 'models/todo'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const filterType = types.union(...[SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE].map(types.literal))
const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo: typeof Todo.Type) => !todo.completed,
  [SHOW_COMPLETED]: (todo: typeof Todo.Type) => todo.completed
}

const TodoStore: IAnyModelType = types
  .model('TodoStore', {
    todos: types.array(Todo),
    filter: types.optional(filterType, SHOW_ALL)
  })
  .views((self: typeof TodoStore.Type) => ({
    get completedCount() {
      return self.todos.reduce((count: number, todo: TodoType) => (todo.completed ? count + 1 : count), 0)
    },
    get activeCount() {
      return self.todos.length - self.completedCount
    },
    get filteredTodos() {
      return self.todos.filter(TODO_FILTERS[self.filter])
    }
  }))
  .actions(self => ({
    addTodo(text: string) {
      const id = self.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
      self.todos.unshift({
        id,
        text
      })
    },
    removeTodo(todo: typeof Todo.Type) {
      destroy(todo)
    },
    completeAll() {
      const areAllMarked = self.todos.every(todo => todo.completed)
      self.todos.forEach(todo => (todo.completed = !areAllMarked))
    },
    clearCompleted() {
      self.todos.replace(self.todos.filter(todo => todo.completed === false))
    },
    setFilter(filter: typeof filterType.Type) {
      self.filter = filter
    }
  }))

export const initialState = {
  todos: [
    {
      text: 'learn Mobx',
      completed: false,
      id: 0
    },
    {
      text: 'learn MST',
      completed: false,
      id: 1
    }
  ]
}

export default TodoStore
