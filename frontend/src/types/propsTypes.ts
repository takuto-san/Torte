import type { Meal, DailyMeals, Nutrition, MealCategory } from "./foodTypes";
import { Weekday } from "./dateTypes";
import { ButtonProps } from "@mui/material/Button";

export type DailyOverviewProps = {
  selectedWeekday: Weekday;
  setSelectedWeekday: (weekday: Weekday) => void;
  weekDays: Weekday[];
  dayNutrition: DailyMeals | null;
  nutritionBaselines: Nutrition;
};

export type NutritionProgressProps = {
  label: string;
  current: number;
  goal: number;
  color: string;
  unit?: string;
};

export type MealBreakdownProps = {
  mealsByType: DailyMeals;
  getMealTypeNutrition: (mealType: MealCategory) => Nutrition;
};

export type WeeklyTrendsProps = {
  weeklyChartData: { 
    name: string; 
    calories: number;
  }[];
};

export type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
} & ButtonProps;

export type MealCardProps = {
  meal: Meal;
  isSelected: boolean;
  onToggle: () => void;
};