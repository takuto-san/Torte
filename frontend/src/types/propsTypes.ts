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