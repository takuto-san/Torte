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
import { dummyMeals } from "@/utils/dummy";
import type {
  MealsByType,
} from '@/types/foodTypes';
import {
  getMealsByWeekday,
  getWeeklyNutrition,
  getWeeklyChartData,
  getDayMeals,
  getMealsByType,
  getMealTypeNutrition,
} from "@/utils/nutrition";


export const HomePageLayout: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const mealPlan = dummyMeals; // Todo: APIから取得できるようにする
  const selectedWeekday = useSelector((state: RootState) => state.weekday.selectedWeekday);
  const dispatch = useDispatch();

  const mealsByWeekday = getMealsByWeekday(mealPlan);
  const dayNutrition = mealsByWeekday[selectedWeekday];
  console.log("Meals By Weekday:", mealsByWeekday);
  console.log("Day Nutrition:", dayNutrition);

  // Goals
  const calorieGoal = user?.dailyCalorieGoal ?? 2000;
  const proteinGoal = Math.round(
    (calorieGoal * (user?.macroGoals?.protein ?? 25)) / 100 / 4
  );
  const carbGoal = Math.round(
    (calorieGoal * (user?.macroGoals?.carbs ?? 50)) / 100 / 4
  );
  const fatGoal = Math.round(
    (calorieGoal * (user?.macroGoals?.fat ?? 25)) / 100 / 9
  );

  const weeklyNutrition = getWeeklyNutrition(weekDays, mealsByWeekday);
  const weeklyChartData = getWeeklyChartData(weeklyNutrition);

  const dayMeals = getDayMeals(mealPlan, selectedWeekday);
  const mealsByType = getMealsByType(dayMeals);
  const getNutritionByMealType = (mealType: keyof MealsByType) =>
    getMealTypeNutrition(mealsByType[mealType] || []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Torte
        </h1>
        <p className="text-gray-600">
          Track your daily nutrition and stay on target
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Daily Overview */}
          <DailyOverview
            selectedWeekday={selectedWeekday}
            setSelectedWeekday={(day: string) => {
              dispatch(setSelectedWeekday(day));
            }}
            weekDays={weekDays}
            dayNutrition={dayNutrition}
            calorieGoal={calorieGoal}
            proteinGoal={proteinGoal}
            carbGoal={carbGoal}
          />
          {/* Meal Breakdown */}
          <MealBreakdown
            mealsByType={mealsByType}
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