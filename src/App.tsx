import * as React from 'react'
import { Provider } from 'mobx-react'
import AppComponent from './components/App'
import { IRootStoreType } from './store'
import 'todomvc-app-css/index.css'
import './app.css'

interface IAppProps {
  store: IRootStoreType
}

const App: React.FC<IAppProps> = ({ store }) => {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  )
}

export default App
