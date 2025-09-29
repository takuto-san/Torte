import React, { ChangeEvent, FC } from "react";
import { NutritionProgressProps, DailyOverviewProps } from "@/types/propsTypes";
import { MealCategory } from "@/types/foodTypes";

export const NutritionProgress: FC<NutritionProgressProps> = ({
  label,
  current,
  goal,
  color,
  unit = "g",
}) => {
  const percentage = Math.min((current / goal) * 100, 100);
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">
          {Math.round(current)}/{goal}
          {unit}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

// 日別栄養概要
export const DailyOverview: React.FC<DailyOverviewProps> = ({
  selectedWeekday,
  setSelectedWeekday,
  weekDays,
  dayNutrition,
  nutritionBaselines,
}) => {
  const categories: MealCategory[] = ["breakfast", "lunch", "dinner", "snack"];
  const total = categories.reduce(
    (sum, cat) => {
      const nutrition = dayNutrition?.[cat]?.totalNutrition ?? { calories: 0, protein: 0, carbs: 0, fat: 0 };
      return {
        calories: sum.calories + nutrition.calories,
        protein: sum.protein + nutrition.protein,
        carbs: sum.carbs + nutrition.carbs,
      };
    },
    { calories: 0, protein: 0, carbs: 0 }
  );

  const calories = total.calories;
  const protein = total.protein;
  const carbs = total.carbs;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Daily Overview</h2>
        <select
          value={selectedWeekday}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedWeekday(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {weekDays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-emerald-600 mb-2">
            {Math.round(calories)}
          </div>
          <div className="text-gray-600">Calories Consumed</div>
          <div className="text-sm text-gray-500">
            {Math.round(nutritionBaselines.calories - calories)} remaining
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <NutritionProgress
          label="Calories"
          current={calories}
          goal={nutritionBaselines.calories}
          color="bg-emerald-500"
          unit=""
        />
        <NutritionProgress
          label="Protein"
          current={protein}
          goal={nutritionBaselines.protein}
          color="bg-blue-500"
        />
        <NutritionProgress
          label="Carbs"
          current={carbs}
          goal={nutritionBaselines.carbs}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
};