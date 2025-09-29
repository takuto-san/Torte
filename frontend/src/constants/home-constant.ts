import { weekDays } from "@/utils/date";
import { dummyMeals } from "@/utils/dummy";
import type { Meal, Nutrition, MealCategory, WeeklyMeals, DailyMeals } from "@/types/foodTypes";
import type { Weekday } from "@/types/dateTypes";
import { getWeeklyMeals, getWeeklyNutrition, getWeeklyChartData } from "@/utils/nutrition";

// ダミーの1週間分のデータ
export const weeklyMealPlan: { weekday: Weekday; meals: Meal[] }[] = weekDays.map(day => ({
  weekday: day,
  meals: dummyMeals,
}));

// 基準値
export const calorieBaseline = 2200;
export const proteinBaseline = Math.round((calorieBaseline * 16.5) / 100 / 4); // 90g
export const carbBaseline    = Math.round((calorieBaseline * 57.5) / 100 / 4); // 316g
export const fatBaseline     = Math.round((calorieBaseline * 25) / 100 / 9);   // 61g

export const nutritionBaselines: Nutrition = {
  calories: calorieBaseline,
  protein: proteinBaseline,
  carbs: carbBaseline,
  fat: fatBaseline,
};

// 週間データ生成関数（利用時はselectedWeekdayを渡して使う）
export function getDefaultMealsByWeekday() {
  return getWeeklyMeals(weeklyMealPlan);
}
export function getDefaultWeeklyNutrition(mealsByWeekday: WeeklyMeals) {
  return getWeeklyNutrition(weekDays, mealsByWeekday);
}
export function getDefaultWeeklyChartData(weeklyNutrition: ReturnType<typeof getWeeklyNutrition>) {
  return getWeeklyChartData(weeklyNutrition);
}

// 食事カテゴリごとの栄養素合計取得関数のひな型
export function getNutritionByMealType(dayNutrition: DailyMeals | null, mealType: MealCategory) {
  return dayNutrition && dayNutrition[mealType]
    ? dayNutrition[mealType].totalNutrition
    : { calories: 0, protein: 0, carbs: 0, fat: 0 };
}