import * as React from 'react'
import { inject } from 'mobx-react'

import { IRootStoreType } from 'store'
import Header from './Header'
import MainSection from './MainSection'
import Hello from './Hello'

interface IProps {
  store: IRootStoreType
}

const App: React.FC<IProps> = ({ store }) => {
  const { todo } = store

  return (
    <div style={{ padding: '12px' }}>
      <Header addTodo={todo.addTodo} />
      <MainSection store={todo} />
      <Hello title="Hello" />
    </div>
  )
}

export default inject('store')(App) as React.FC
