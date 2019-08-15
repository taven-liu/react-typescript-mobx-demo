import { types, getRoot } from 'mobx-state-tree'

import { IRootStoreType } from 'store'

const Todo = types
  .model({
    text: types.string,
    completed: false,
    id: types.identifierNumber
  })
  .actions(self => ({
    remove() {
      getRoot<IRootStoreType>(self).todo.removeTodo(self)
    },
    edit(text: string) {
      self.text = text
    },
    complete() {
      self.completed = !self.completed
    }
  }))

export type TodoType = typeof Todo.Type

export default Todo
