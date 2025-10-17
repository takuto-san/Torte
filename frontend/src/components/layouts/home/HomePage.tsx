"use client";

import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/stores/store";
import { weekDays } from "@/utils/date";
import { DailyOverview } from "@/components/organisms/daily-overview/page";
import { MealBreakdown } from "@/components/organisms/meal-breakdown/page";
import { WeeklyOverview } from "@/components/organisms/weekly-overview/page";
import { WeeklyTrends } from "@/components/organisms/weekly-trends/page";
import { setSelectedWeekday } from "@/stores/utils/weekdaySlice";
import type { MealCategory } from "@/types/foodTypes";
import type { Weekday } from "@/types/dateTypes";
import {
  nutritionBaselines,
  getDefaultMealsByWeekday,
  getDefaultWeeklyNutrition,
  getDefaultWeeklyChartData,
} from "@/constants/home-constant";

export const HomePageLayout: FC = () => {
  const selectedWeekday = useSelector(
    (state: RootState) => state.weekday.selectedWeekday as Weekday,
  );
  const dispatch = useDispatch();

  const mealsByWeekday = getDefaultMealsByWeekday();
  const dayNutrition = mealsByWeekday[selectedWeekday];
  const weeklyNutrition = getDefaultWeeklyNutrition(mealsByWeekday);
  const weeklyChartData = getDefaultWeeklyChartData(weeklyNutrition);

  // // 食事カテゴリごとの栄養素合計取得関数
  const getNutritionByMealType = (mealType: MealCategory) =>
    dayNutrition && dayNutrition[mealType]
      ? dayNutrition[mealType].totalNutrition
      : { calories: 0, protein: 0, carbs: 0, fat: 0, carbohydrates: 0, salt: 0 };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Torte</h1>
        <p className="text-gray-600">
          Track your daily nutrition and stay on target
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Daily Overview */}
          <DailyOverview
            selectedWeekday={selectedWeekday}
            setSelectedWeekday={(day: Weekday) => {
              dispatch(setSelectedWeekday(day));
            }}
            weekDays={weekDays}
            dayNutrition={dayNutrition}
            nutritionBaselines={nutritionBaselines}
          />
          {/* Meal Breakdown */}
          <MealBreakdown
            mealsByType={dayNutrition}
            getMealTypeNutrition={getNutritionByMealType}
          />
        </div>

        <div className="space-y-6">
          {/* Weekly Overview, Trends */}
          <WeeklyOverview weekDays={weekDays} mealsByWeekday={mealsByWeekday} />
          <WeeklyTrends weeklyChartData={weeklyChartData} />
        </div>
      </div>
    </div>
  );
};
