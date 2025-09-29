export type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack' | '';

export type Food = {
  id: number;
  name: string;
  cuisine: string;
  dietaryTags: string[];
  difficulty: string;
  nutrition: Nutrition;
  servings: number;
  image: string;
  isRecorded: boolean; 
  recordedCategories: MealCategory[]; 
};

export type SearchParams = {
  tab: string;
  query: string;
  category?: string;
};