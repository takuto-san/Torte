import type { Food } from "@/types/mealTypes";

export const dummyFoods: Food[] = [
  {
    id: 1,
    name: "Dummy Curry",
    cuisine: "Japanese",
    dietaryTags: ["vegan"],
    difficulty: "easy",
    nutrition: { calories: 300, protein: 10, carbs: 50, fat: 5 },
    servings: 2,
    image: "https://placehold.jp/150x150.png",
  },
  {
    id: 2,
    name: "Dummy Salad",
    cuisine: "Western",
    dietaryTags: ["vegetarian"],
    difficulty: "easy",
    nutrition: { calories: 120, protein: 3, carbs: 20, fat: 4 },
    servings: 1,
    image: "https://placehold.jp/150x150.png",
  },
];