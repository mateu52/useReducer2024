import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import usersReducer from '../features/Users/UsersSlice'; 

const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//export const useAppDispatch = useDispatch.withTypes<AppDispatch>()