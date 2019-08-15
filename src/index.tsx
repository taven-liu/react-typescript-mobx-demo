import * as React from 'react'
import { render } from 'react-dom'
import { getSnapshot, destroy } from 'mobx-state-tree'
import { connectReduxDevtools } from 'mst-middlewares'

import App from './App'
import RootStore, { initialState, IRootStoreType } from './store'

let store: IRootStoreType

function configurateStore(snapshot?: any) {
  if (store) {
    destroy(store)
  }
  store = RootStore.create(snapshot)
  connectReduxDevtools(require('remotedev'), store)
  return store
}

function renderApp(Component: React.FC<any>, rootStore: any) {
  render(<Component store={rootStore} />, document.getElementById('root'))
}

// Initial render
renderApp(App, configurateStore(initialState))

// Connect HMR
if ((module as any).hot) {
  ;(module as any).hot.accept(['./App'], () => {
    // Store definition changed, recreate a new one from old state
    renderApp(App, configurateStore(getSnapshot(store)))
  })
  ;(module as any).hot.accept(['./store'], () => {
    // Component definition changed, re-render app
    renderApp(App, store)
  })
}
