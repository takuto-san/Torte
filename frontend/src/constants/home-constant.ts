import { weekDays } from "@/utils/date";
import { dummyMeals } from "@/utils/dummy";
import type {
  Meal,
  Nutrition,
  MealCategory,
  WeeklyMeals,
  DailyMeals,
} from "@/types/foodTypes";
import type { Weekday } from "@/types/dateTypes";
import {
  getWeeklyMeals,
  getWeeklyNutrition,
  getWeeklyChartData,
} from "@/utils/nutrition";

// ダミーの1週間分のデータ
export const weeklyMealPlan: { weekday: Weekday; meals: Meal[] }[] =
  weekDays.map((day) => ({
    weekday: day,
    meals: dummyMeals,
  }));

// 基準値
export const calorieBaseline = 2200;
export const proteinBaseline = Math.round((calorieBaseline * 16.5) / 100 / 4); // 90g
export const carbBaseline = Math.round((calorieBaseline * 57.5) / 100 / 4); // 316g
export const fatBaseline = Math.round((calorieBaseline * 25) / 100 / 9); // 61g

export const nutritionBaselines: Nutrition = {
  calories: calorieBaseline,
  protein: proteinBaseline,
  carbs: carbBaseline,
  fat: fatBaseline,
  salt: 8,
};

// 週間データ生成関数（利用時はselectedWeekdayを渡して使う）
export function getDefaultMealsByWeekday() {
  return getWeeklyMeals(weeklyMealPlan);
}
export function getDefaultWeeklyNutrition(mealsByWeekday: WeeklyMeals) {
  return getWeeklyNutrition(weekDays, mealsByWeekday);
}

// getWeeklyChartData が { day: string; nutrition: Nutrition }[] を期待するため、
// day を string 化し、nutrition を必ず salt を含む Nutrition に正規化してから渡す。
export function getDefaultWeeklyChartData(
  weeklyNutrition: ReturnType<typeof getWeeklyNutrition>,
) {
  const normalized = weeklyNutrition.map((item) => {
    // item.nutrition に salt が無いケース（{ calories, protein, carbs, fat }）へ対応
    const n = item.nutrition as
      | Nutrition
      | { calories: number; protein: number; carbs: number; fat: number; salt?: number };

    const withSalt: Nutrition = {
      calories: n.calories,
      protein: n.protein,
      carbs: n.carbs,
      fat: n.fat,
      salt: "salt" in n && typeof n.salt === "number" ? n.salt : 0,
    };

    return {
      day: String(item.day), // Weekday を string へ
      nutrition: withSalt,
    };
  });

  return getWeeklyChartData(normalized);
}

// 食事カテゴリごとの栄養素合計取得関数
export function getNutritionByMealType(
  dayNutrition: DailyMeals | null,
  mealType: MealCategory,
): Nutrition {
  return dayNutrition && dayNutrition[mealType]
    ? dayNutrition[mealType].totalNutrition
    : { calories: 0, protein: 0, carbs: 0, fat: 0, salt: 0 };
}