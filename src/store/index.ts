import { types } from 'mobx-state-tree'

import hello, { initialState as helloInitialState } from './hello'
import todo, { initialState as todoInitialState } from './todo'

const Root = types.model('RootStore', {
  hello,
  todo
})

export const initialState = {
  todo: todoInitialState,
  hello: helloInitialState
}

export type IRootStoreType = typeof Root.Type

export default Root
