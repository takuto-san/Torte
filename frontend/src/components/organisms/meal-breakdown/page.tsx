import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import type { MealBreakdownProps } from "@/types/propsTypes";
import type { Meal, Food, MealCategory } from "@/types/foodTypes";

export const MealBreakdown: React.FC<MealBreakdownProps> = ({
  mealsByType,
  getMealTypeNutrition,
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Meal Breakdown</h2>
    <div className="space-y-6">
      {Object.entries(mealsByType).map(([mealType, mealObj]) => {
        const mealNutrition = getMealTypeNutrition(mealType as MealCategory);
        const meals = mealObj.meals;
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
            {meals.length > 0 ? (
              <div className="space-y-2">
                {meals.map((meal: Meal, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {/* 複数食品の場合は最初の食品を表示（必要に応じて拡張可） */}
                      {meal.foods[0].image ? (
                        <Image
                          src={
                            meal.foods[0].image.startsWith("http")
                              ? meal.foods[0].image
                              : "/" + meal.foods[0].image
                          }
                          alt={meal.foods[0].name}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <ImageNotSupportedIcon
                          sx={{ fontSize: 50, color: "#aaa" }}
                          className="rounded-lg"
                        />
                      )}
                      <div>
                        {/* 複数食品名をカンマ区切りで表示 */}
                        <div className="font-medium text-gray-900">
                          {meal.foods.map((food: Food) => food.name).join(", ")}
                        </div>
                        {/* 食数情報が必要ならここで拡張可能 */}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {Math.round(meal.totalNutrition.calories)}
                      </div>
                      <div className="text-sm text-gray-500">calories</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <IconButton
                  component={Link}
                  href="/record"
                  aria-label={`Add ${mealType} meal`}
                  className="mb-2"
                >
                  <AddCircleOutlineIcon className="h-8 w-8 mx-auto text-gray-400" />
                </IconButton>
                <p>No {mealType} logged</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);
