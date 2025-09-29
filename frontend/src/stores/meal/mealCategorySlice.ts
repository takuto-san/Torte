import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DailyMeals, MealCategory } from '@/types/foodTypes';

interface MealCategoryState {
  mealsByType: DailyMeals;
  selectedCategory: MealCategory;
}

export const initialState: MealCategoryState = {
  mealsByType: {
    breakfast: { meals: [], totalNutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 } },
    lunch:     { meals: [], totalNutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 } },
    dinner:    { meals: [], totalNutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 } },
    snack:     { meals: [], totalNutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 } },
  },
  selectedCategory: "breakfast",
};

const mealCategorySlice = createSlice({
  name: 'mealCategory',
  initialState,
  reducers: {
    setMealsByType: (state, action: PayloadAction<DailyMeals>) => {
      state.mealsByType = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<MealCategory>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setMealsByType, setSelectedCategory } = mealCategorySlice.actions;
export default mealCategorySlice.reducer;