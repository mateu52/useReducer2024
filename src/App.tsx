
import './App.css'
import { UsersReducer } from './ui/UsersReducer'
import { Counter } from './features/counter/Counter'
import { UserList } from './features/Users/UserList'
import { Provider } from 'react-redux'
import store from './app/store'

function App() {

  return (
    <Provider store={store}>
      <UserList/>
    </Provider>
  )
}

export default App
