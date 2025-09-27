import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/stores/count/counterSlice' 
import authReducer from '@/stores/auth/authSlice'
import dateReducer from '@/stores/utils/dateSlice'
import weekdayReducer from '@/stores/utils/weekdaySlice'
import mealCategoryReducer from '@/stores/meal/mealCategorySlice'
import loadingReducer from '@/stores/loading/loadingSlice'
import searchReducer from '@/stores/input/search/searchSlice'
import tabReducer from '@/stores/tab/tabSlice'

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