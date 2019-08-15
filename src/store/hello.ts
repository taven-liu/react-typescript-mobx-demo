import { types } from 'mobx-state-tree'

const Hello = types
  .model({
    count: types.number
  })
  .actions(self => ({
    add() {
      ++self.count
    },
    subtract() {
      --self.count
    }
  }))

export const initialState = {
  count: 1
}

export type HelloStoreType = typeof Hello.Type

export default Hello
