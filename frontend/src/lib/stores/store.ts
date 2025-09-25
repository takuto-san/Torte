import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './count/counterSlice' 
import authReducer from './auth/authSlice'
import dateReducer from './utils/dateSlice'
import weekdayReducer from './utils/weekdaySlice'
import mealCategoryReducer from './meal/mealCategorySlice'
import loadingReducer from './loading/loadingSlice'
import searchReducer from './input/search/searchSlice'
import tabReducer from './tab/tabSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      auth: authReducer,
      date: dateReducer,
      weekday: weekdayReducer,
      mealCategory: mealCategoryReducer,
      loading: loadingReducer,
      search: searchReducer,
      tab: tabReducer,
      // 他のreducerもここに追加
    },  
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']