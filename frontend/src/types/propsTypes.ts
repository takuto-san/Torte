import type { MealsByType } from "./mealTypes";
import { ButtonProps } from "@mui/material/Button";

export type DailyOverviewProps = {
  selectedWeekday: string;
  setSelectedWeekday: (weekday: string) => void;
  weekDays: string[];
  dayNutrition: {
    calories: number;
    protein: number;
    carbs: number;
  };
  calorieGoal: number;
  proteinGoal: number;
  carbGoal: number;
};

export type NutritionProgressProps = {
  label: string;
  current: number;
  goal: number;
  color: string;
  unit?: string;
};

export type MealBreakdownProps = {
  mealsByType: MealsByType;
  getMealTypeNutrition: (mealType: keyof MealsByType) => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
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