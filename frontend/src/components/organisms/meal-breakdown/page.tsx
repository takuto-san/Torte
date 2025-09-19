import React from "react";
import Image from "next/image";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import type { MealBreakdownProps } from "@/types/propsTypes";
import type { Meal, MealsByType } from '@/types/mealTypes';

export const MealBreakdown: React.FC<MealBreakdownProps> = ({
  mealsByType,
  getMealTypeNutrition,
}) => (
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
                {meals.map((meal: Meal, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Image
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
);