import React from "react";
import type { MealCardProps } from "@/types/propsTypes";
import Image from "next/image";

export const FoodCard: React.FC<MealCardProps> = ({ meal, isSelected, onToggle }) => (
  <div
    className={`bg-white rounded-lg shadow p-4 flex items-center gap-4 cursor-pointer ${isSelected ? "border-2 border-emerald-500" : ""}`}
    onClick={onToggle}
  >
    <Image
      src={meal.food.image}
      alt={meal.food.name}
      width={60}
      height={60}
      className="rounded-lg object-cover"
    />
    <div>
      <div className="font-bold text-lg">{meal.food.name}</div>
      <div className="text-sm mt-1">
        Calories: {Math.round((meal.food.nutrition.calories * meal.servings) / meal.food.servings)}
      </div>
      <div className="text-xs text-gray-500">{isSelected ? "Selected" : ""}</div>
    </div>
  </div>
);