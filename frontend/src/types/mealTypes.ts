export type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Recipe = {
  _id: string;
  name: string;
  cuisine: string;
  dietaryTags: string[];
  difficulty: string;
  nutrition: Nutrition;
  servings: number;
  image: string;
};

export type Meal = {
  _id: string;
  date: string;
  mealType: string;
  recipe: Recipe;
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