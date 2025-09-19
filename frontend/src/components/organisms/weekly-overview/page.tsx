import React, { FC } from "react";
import type { MealsByWeekday } from "@/types/mealTypes";

export const WeeklyOverview: FC<{ weekDays: string[]; mealsByWeekday: MealsByWeekday }> = ({
  weekDays,
  mealsByWeekday,
}) => (
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
);