import { Weekday } from "./dateTypes";

// 1週間の食事
export type WeeklyMeals = {
  [weekday in Weekday]: DailyMeals;
};

// 1日の食事
export type DailyMeals = {
  [category in MealCategory]: {
    meals: Meal[];
    totalNutrition: Nutrition;
  };
};

// 食事カテゴリ
export type MealCategory = "breakfast" | "lunch" | "dinner" | "snack";

// カテゴリごとの食事
export type Meal = {
  mealType: MealCategory;
  foods: Food[];
  totalNutrition: Nutrition;
};

// 栄養情報
export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  salt: number;
}

// 食品情報
export type Food = {
  id: number;
  name: string;
  category: string;
  nutrition: Nutrition;
  image: string;
  recordedCategories: MealCategory[];
};

// 単位
export interface Unit {
  id: number;
  name: string;
  description: string;
  step: number;
}

export interface IngredientWithNutrition {
  id: string;
  name: string;
  quantity: number;
  unit: Unit;
  nutrition: Nutrition;
}