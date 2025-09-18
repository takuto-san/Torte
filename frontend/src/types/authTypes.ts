export type User = {
  id: string;
  name: string;
  email: string;
  dailyCalorieGoal?: number;
  macroGoals?: Partial<MacroGoals>;
};

export type MacroGoals = {
  protein: number;
  carbs: number;
  fat: number;
};

export type AuthState = {
  user: User | null;
  loading: boolean;
};