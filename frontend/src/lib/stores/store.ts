import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './count/counterSlice' 
import authReducer from './auth/authSlice'
import dateReducer from './utils/date/dateSlice'
import weekdayReducer from './utils/weekday/weekdaySlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      auth: authReducer,
      date: dateReducer,
      weekday: weekdayReducer,
      // 他のreducerもここに追加
    },  
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']