import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealsByType, MealCategory } from '@/types/foodTypes';

interface MealCategoryState {
  mealsByType: MealsByType;
  selectedCategory: MealCategory;
}

const initialState: MealCategoryState = {
  mealsByType: {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  },
  selectedCategory: "",
};

const mealCategorySlice = createSlice({
  name: 'mealCategory',
  initialState,
  reducers: {
    setMealsByType: (state, action: PayloadAction<MealsByType>) => {
      state.mealsByType = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<MealCategory>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setMealsByType, setSelectedCategory } = mealCategorySlice.actions;
export default mealCategorySlice.reducer;