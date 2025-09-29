import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "@/stores/count/counterSlice";
import authReducer from "@/stores/auth/authSlice";
import dateReducer from "@/stores/utils/dateSlice";
import weekdayReducer from "@/stores/utils/weekdaySlice";
import mealCategoryReducer from "@/stores/meal/mealCategorySlice";
import loadingReducer from "@/stores/loading/loadingSlice";
import searchReducer from "@/stores/input/searchSlice";
import tabReducer from "@/stores/tab/tabSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  date: dateReducer,
  weekday: weekdayReducer,
  mealCategory: mealCategoryReducer,
  loading: loadingReducer,
  search: searchReducer,
  tab: tabReducer,
  // 他のreducerもここに追加
});

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
