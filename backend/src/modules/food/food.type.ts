export type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Food = {
  id: number;
  name: string;
  cuisine: string;
  dietaryTags: string[];
  difficulty: string;
  nutrition: Nutrition;
  servings: number;
  image: string;
};