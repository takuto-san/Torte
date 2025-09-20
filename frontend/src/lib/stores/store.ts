import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './count/counterSlice' 
import authReducer from './auth/authSlice'
import dateReducer from './date/dateSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      auth: authReducer,
      date: dateReducer,
      // 他のreducerもここに追加
    },  
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']