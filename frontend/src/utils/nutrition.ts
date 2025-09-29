import type {
  Meal,
  DailyMeals,
  WeeklyMeals,
  Nutrition,
  MealCategory,
} from "@/types/foodTypes";
import type { Weekday } from "@/types/dateTypes";

// 1日分のカテゴリごとの食事データ生成
export function getDailyMeals(meals: Meal[]): DailyMeals {
  const categories: MealCategory[] = ["breakfast", "lunch", "dinner", "snack"];
  const dailyMeals: DailyMeals = {} as DailyMeals;
  for (const category of categories) {
    const filteredMeals = meals.filter((m) => m.mealType === category);
    const totalNutrition = getTotalNutrition(filteredMeals);
    dailyMeals[category] = {
      meals: filteredMeals,
      totalNutrition,
    };
  }
  return dailyMeals;
}

// 1食カテゴリの合計栄養素
export function getTotalNutrition(meals: Meal[]): Nutrition {
  return meals.reduce(
    (total, meal) => ({
      calories: total.calories + meal.totalNutrition.calories,
      protein: total.protein + meal.totalNutrition.protein,
      carbs: total.carbs + meal.totalNutrition.carbs,
      fat: total.fat + meal.totalNutrition.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

// 週間データ生成
export function getWeeklyMeals(
  mealPlans: { weekday: Weekday; meals: Meal[] }[],
): WeeklyMeals {
  const weeklyMeals: WeeklyMeals = {} as WeeklyMeals;
  for (const { weekday, meals } of mealPlans) {
    weeklyMeals[weekday] = getDailyMeals(meals);
  }
  return weeklyMeals;
}

// 週間栄養素（曜日ごと合計）
export function getWeeklyNutrition(
  weekDays: Weekday[],
  weeklyMeals: WeeklyMeals,
) {
  return weekDays.map((day: Weekday) => {
    const daily = weeklyMeals[day];
    const nutrition = daily
      ? getTotalNutrition(Object.values(daily).flatMap((dm) => dm.meals))
      : { calories: 0, protein: 0, carbs: 0, fat: 0 };
    return { day, nutrition };
  });
}

// グラフ用データ整形
export function getWeeklyChartData(
  weeklyNutrition: { day: string; nutrition: Nutrition }[],
) {
  return weeklyNutrition.map((day) => ({
    name: day.day.slice(0, 3),
    calories: Math.round(day.nutrition.calories),
  }));
}

// 合計カロリー
export function getTotalCalories(
  weeklyNutrition: { nutrition: Nutrition }[],
): number {
  return weeklyNutrition.reduce((sum, day) => sum + day.nutrition.calories, 0);
}

// 平均カロリー
export function getAverageCalories(
  weeklyNutrition: { nutrition: Nutrition }[],
): number {
  const total = getTotalCalories(weeklyNutrition);
  return Math.round(total / weeklyNutrition.length);
}

// 連続記録（ストリーク）の日数
export function getStreak(weeklyNutrition: { nutrition: Nutrition }[]): number {
  return weeklyNutrition.reduceRight((count, day) => {
    if (day.nutrition.calories > 0) return count + 1;
    return count > 0 ? count : 0;
  }, 0);
}

// 目標達成日数・達成率
export function getGoalAchievement(
  weeklyNutrition: { nutrition: Nutrition }[],
  calorieGoal: number,
): number {
  const days = weeklyNutrition.filter(
    (day) => day.nutrition.calories >= calorieGoal * 0.9,
  ).length;
  return Math.round((days / weeklyNutrition.length) * 100);
}

// 曜日ごとのMeal抽出
export function getDayMeals(
  weeklyMeals: WeeklyMeals,
  weekday: Weekday,
): Meal[] {
  const dailyMeals = weeklyMeals[weekday];
  if (!dailyMeals) return [];
  return Object.values(dailyMeals).flatMap((dm) => dm.meals);
}

// 食事タイプごとのMeals抽出
export function getMealsByType(
  dailyMeals: DailyMeals,
  type: MealCategory,
): Meal[] {
  return dailyMeals[type]?.meals ?? [];
}
