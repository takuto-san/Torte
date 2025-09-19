"use client";
import React, { useState, ChangeEvent, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWeekday, getWeekdayFromDate, getTodayWeekday, weekDays } from "@/utils/dateUtils";
import { DailyOverview } from "@/components/organisms/daily-overview/page";
import { MealBreakdown } from "@/components/organisms/meal-breakdown/page";
import {
  getMealsByWeekday,
  getWeeklyNutrition,
  getWeeklyChartData,
  getTotalCalories,
  getAverageCalories,
  getStreak,
  getGoalAchievement,
  getDayMeals,
  getMealsByType,
  getMealTypeNutrition,
} from "@/utils/nutrition";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { RootState } from "@/lib/stores/store";
import type {
  Meal,
  MealsByWeekday,
  MealsByType,
  Recipe,
} from '@/types/mealTypes';

// ダミーデータ
const dummyRecipes: Recipe[] = [
  {
    _id: "r1",
    name: "Dummy Curry",
    cuisine: "Japanese",
    dietaryTags: ["vegan"],
    difficulty: "easy",
    nutrition: { calories: 300, protein: 10, carbs: 50, fat: 5 },
    servings: 2,
    image: "https://placehold.jp/150x150.png",
  },
  {
    _id: "r2",
    name: "Dummy Salad",
    cuisine: "Western",
    dietaryTags: ["vegetarian"],
    difficulty: "easy",
    nutrition: { calories: 120, protein: 3, carbs: 20, fat: 4 },
    servings: 1,
    image: "https://placehold.jp/150x150.png",
  },
];

const dummyMealPlan: Meal[] = [
  {
    _id: "m1",
    date: new Date().toISOString(),
    mealType: "breakfast",
    recipe: dummyRecipes[0],
    servings: 2,
  },
  {
    _id: "m2",
    date: new Date().toISOString(),
    mealType: "lunch",
    recipe: dummyRecipes[1],
    servings: 1,
  },
];

const NutritionTracker: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const mealPlan = dummyMealPlan; // Todo: APIから取得できるようにする
  const dispatch = useDispatch();
  const selectedWeekday = useSelector((state: RootState) => state.weekday.selectedWeekday);
  const [showAddFood, setShowAddFood] = useState<boolean>(false);

  // const
  const mealsByWeekday = getMealsByWeekday(mealPlan);
  const dayNutrition = mealsByWeekday[selectedWeekday];

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

  const totalCalories = getTotalCalories(weeklyNutrition);
  const avgCalories = getAverageCalories(weeklyNutrition);
  const streak = getStreak(weeklyNutrition);
  const goalAchievement = getGoalAchievement(weeklyNutrition, calorieGoal);

  const dayMeals = getDayMeals(mealPlan, selectedWeekday, getWeekdayFromDate);
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
              // dispatch(setSelectedWeekday(day)); --- IGNORE ---
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
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Overview by Weekday
            </h3>
            <div className="space-y-3">
              {weekDays.map((day) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-gray-600">{day}</span>
                  <span className="font-medium">
                    {Math.round(mealsByWeekday[day]?.calories || 0)} cal
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Trends
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracker;