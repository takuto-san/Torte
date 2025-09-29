import React, { FC } from "react";
import type { WeeklyMeals, MealCategory } from "@/types/foodTypes";
import type { Weekday } from "@/types/dateTypes";

const mealCategories: MealCategory[] = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
];

export const WeeklyOverview: FC<{
  weekDays: Weekday[];
  mealsByWeekday: WeeklyMeals;
}> = ({ weekDays, mealsByWeekday }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Weekly Overview by Weekday
    </h3>
    <div className="space-y-3">
      {weekDays.map((day) => {
        const dailyMeals = mealsByWeekday[day];
        // 各カテゴリの合計カロリーを集計
        const totalCalories = dailyMeals
          ? mealCategories.reduce(
              (sum, category) =>
                sum + (dailyMeals[category]?.totalNutrition?.calories || 0),
              0,
            )
          : 0;
        return (
          <div key={day} className="flex items-center justify-between">
            <span className="text-gray-600">{day}</span>
            <span className="font-medium">{Math.round(totalCalories)} cal</span>
          </div>
        );
      })}
    </div>
  </div>
);
