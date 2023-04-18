import React, { createContext, FC } from 'react'
import 'assets/style.scss'
import { observer } from 'mobx-react-lite'
import NavigationBar from './components/navigation/NavigationBar/NavigationBar'
import Footer from 'components/footer/Footer'
import Router from './routes'
import 'react-widgets/styles.css'
import Store from './store/store'

interface State {
  store: Store,
}

export const store = new Store()

export const Context = createContext<State>({
  store,
})
const App: FC = () => {

  return (
    <Context.Provider value={{
      store
    }}>
      <NavigationBar />
      <Router />
      <Footer />
    </Context.Provider>
  )
}

export default observer(App)
