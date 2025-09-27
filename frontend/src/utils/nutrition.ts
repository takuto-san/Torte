import type { 
  Meal, 
  MealsByType, 
  MealsByWeekday,
  NutritionSummary,
} from "@/types/mealTypes";
import { getTodayWeekday, getWeekday, getTodayDate } from "@/utils/date";

// 曜日ごとの栄養素集計
export function getMealsByWeekday(mealPlan: Meal[]): MealsByWeekday {
  return mealPlan.reduce((acc: MealsByWeekday, meal: Meal) => {
    const dateObj = getTodayDate(); // { year, month, day }
    const dateStr = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;
    const weekday = getWeekday(dateStr); // "Monday", etc.
    const multiplier = meal.servings / meal.food.servings;

    if (!acc[weekday]) {
      acc[weekday] = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        count: 0,
      };
    }

    acc[weekday].calories += meal.food.nutrition.calories * multiplier;
    acc[weekday].protein += meal.food.nutrition.protein * multiplier;
    acc[weekday].carbs += meal.food.nutrition.carbs * multiplier;
    acc[weekday].fat += meal.food.nutrition.fat * multiplier;
    acc[weekday].count += 1;

    return acc;
  }, {} as MealsByWeekday);
}

export function getWeeklyNutrition(
  weekDays: string[],
  mealsByWeekday: MealsByWeekday
) {
  return weekDays.map((day) => ({
    day,
    nutrition: mealsByWeekday[day] || {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  }));
}

// グラフ用データ整形
export function getWeeklyChartData(
  weeklyNutrition: { day: string; nutrition: { calories: number } }[]
) {
  return weeklyNutrition.map((day) => ({
    name: day.day.slice(0, 3),
    calories: Math.round(day.nutrition.calories),
  }));
}

// 合計カロリー
export function getTotalCalories(weeklyNutrition: { nutrition: { calories: number } }[]): number {
  return weeklyNutrition.reduce((sum, day) => sum + day.nutrition.calories, 0);
}

// 平均カロリー
export function getAverageCalories(weeklyNutrition: { nutrition: { calories: number } }[]): number {
  const total = getTotalCalories(weeklyNutrition);
  return Math.round(total / weeklyNutrition.length);
}

// 連続記録（ストリーク）の日数
export function getStreak(weeklyNutrition: { nutrition: { calories: number } }[]): number {
  return weeklyNutrition.reduceRight((count, day) => {
    if (day.nutrition.calories > 0) return count + 1;
    return count > 0 ? count : 0;
  }, 0);
}

// 目標達成日数・達成率
export function getGoalAchievement(weeklyNutrition: { nutrition: { calories: number } }[], calorieGoal: number): number {
  const days = weeklyNutrition.filter(
    (day) => day.nutrition.calories >= calorieGoal * 0.9
  ).length;
  return Math.round((days / weeklyNutrition.length) * 100);
}

// 曜日ごとの食事のフィルタ
export function getDayMeals(mealPlan: Meal[], selectedWeekday: string): Meal[] {
  return mealPlan.filter(
    (meal) => getTodayWeekday() === selectedWeekday
  );
}

// 食事タイプごとの分類
export function getMealsByType(dayMeals: Meal[]): MealsByType {
  return {
    breakfast: dayMeals.filter((meal) => meal.mealType === "breakfast"),
    lunch: dayMeals.filter((meal) => meal.mealType === "lunch"),
    dinner: dayMeals.filter((meal) => meal.mealType === "dinner"),
    snack: dayMeals.filter((meal) => meal.mealType === "snack"),
  };
}

// 食事タイプごとの栄養素合計
export function getMealTypeNutrition(meals: Meal[]): NutritionSummary {
  return meals.reduce(
    (total, meal) => {
      const multiplier = meal.servings / meal.food.servings;
      return {
        calories: total.calories + meal.food.nutrition.calories * multiplier,
        protein: total.protein + meal.food.nutrition.protein * multiplier,
        carbs: total.carbs + meal.food.nutrition.carbs * multiplier,
        fat: total.fat + meal.food.nutrition.fat * multiplier,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}