export type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Food = {
  id: number;
  name: string;
  cuisine: string;
  dietaryTags: string[];
  difficulty: string;
  nutrition: Nutrition;
  servings: number;
  image: string;
};

export type Meal = {
  id: number;
  mealType: string;
  food: Food;
  servings: number;
};

export type MealsByWeekday = {
  [weekday: string]: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    count: number;
  };
};

export type MealsByType = {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
  snack: Meal[];
};

export type NutritionSummary = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type MealCategory = '朝食' | '昼食' | '夕食' | '間食' | "";