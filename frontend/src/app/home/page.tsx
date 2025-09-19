"use client";
import React, { useState, ChangeEvent, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWeekday, getWeekdayFromDate, getTodayWeekday, weekDays } from "@/utils/dateUtils";
import { DailyOverview } from "@/components/organisms/daily-overview/page";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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

  // Group meals by weekday name
  const mealsByWeekday: MealsByWeekday = mealPlan.reduce((acc: MealsByWeekday, meal: Meal) => {
    const weekday = getWeekday(meal.date); // "Monday", etc.
    const multiplier = meal.servings / meal.recipe.servings;

    if (!acc[weekday]) {
      acc[weekday] = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        count: 0,
      };
    }

    acc[weekday].calories += meal.recipe.nutrition.calories * multiplier;
    acc[weekday].protein += meal.recipe.nutrition.protein * multiplier;
    acc[weekday].carbs += meal.recipe.nutrition.carbs * multiplier;
    acc[weekday].fat += meal.recipe.nutrition.fat * multiplier;
    acc[weekday].count += 1;

    return acc;
  }, {});

  const dayNutrition = mealsByWeekday[selectedWeekday] || {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    count: 0,
  };

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

  const weeklyNutrition = weekDays.map((day) => ({
    day,
    nutrition: mealsByWeekday[day] || {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  }));

  // Convert weeklyNutrition to Recharts data
  const weeklyChartData = weeklyNutrition.map((day) => ({
    name: day.day.slice(0, 3),
    calories: Math.round(day.nutrition.calories),
  }));

  // Calculate weekly stats
  const totalCalories = weeklyNutrition.reduce(
    (sum, day) => sum + day.nutrition.calories,
    0
  );
  const avgCalories = Math.round(totalCalories / 7);

  // Streak: number of consecutive days with calorie entries
  const streak = weeklyNutrition.reduceRight((count, day) => {
    if (day.nutrition.calories > 0) return count + 1;
    return count > 0 ? count : 0;
  }, 0);

  // Goal achievement: days where calories >= 90% of goal
  const goalAchievementDays = weeklyNutrition.filter(
    (day) => day.nutrition.calories >= calorieGoal * 0.9
  ).length;
  const goalAchievement = Math.round((goalAchievementDays / 7) * 100);

  const dayMeals = mealPlan.filter(
    (meal) => getWeekdayFromDate(meal.date) === selectedWeekday
  );

  const mealsByType: MealsByType = {
    breakfast: dayMeals.filter((meal) => meal.mealType === "breakfast"),
    lunch: dayMeals.filter((meal) => meal.mealType === "lunch"),
    dinner: dayMeals.filter((meal) => meal.mealType === "dinner"),
    snack: dayMeals.filter((meal) => meal.mealType === "snack"),
  };

  const getMealTypeNutrition = (mealType: keyof MealsByType) => {
    const meals = mealsByType[mealType] || [];
    return meals.reduce(
      (total, meal) => {
        const multiplier = meal.servings / meal.recipe.servings;
        return {
          calories:
            total.calories + meal.recipe.nutrition.calories * multiplier,
          protein: total.protein + meal.recipe.nutrition.protein * multiplier,
          carbs: total.carbs + meal.recipe.nutrition.carbs * multiplier,
          fat: total.fat + meal.recipe.nutrition.fat * multiplier,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

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
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Meal Breakdown
            </h2>
            <div className="space-y-6">
              {Object.entries(mealsByType).map(([mealType, meals]) => {
                const mealNutrition = getMealTypeNutrition(mealType as keyof MealsByType);
                return (
                  <div
                    key={mealType}
                    className="border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900 capitalize">
                        {mealType}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {Math.round(mealNutrition.calories)} calories
                      </span>
                    </div>
                    {/* 食事記録が存在するかどうか判定 */}
                    {meals.length > 0 ? (
                      <div className="space-y-2">
                        {meals.map((meal, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={meal.recipe.image}
                                alt={meal.recipe.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {meal.recipe.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {meal.servings} serving(s)
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-gray-900">
                                {Math.round(
                                  (meal.recipe.nutrition.calories *
                                    meal.servings) /
                                    meal.recipe.servings
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                calories
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        {/* Todo: 追加画面を実装する */}
                        <AddCircleOutlineIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p>No {mealType} logged</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
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