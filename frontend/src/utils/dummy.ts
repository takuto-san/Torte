import { Food, Meal, MealCategory } from '@/types/foodTypes';

// Food型（最終スキーマ準拠）
export const dummyFoods: Food[] = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    nutrition: { calories: 650, protein: 22, carbs: 80, fat: 24 },
    image: "carbonara.jpg",
    recordedCategories: []
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    nutrition: { calories: 350, protein: 10, carbs: 60, fat: 8 },
    image: "stirfry.jpg",
    recordedCategories: ["lunch", "dinner"]
  },
  {
    id: 3,
    name: "Chicken Tikka Masala",
    nutrition: { calories: 720, protein: 40, carbs: 55, fat: 32 },
    image: "tikka.jpg",
    recordedCategories: []
  },
  {
    id: 4,
    name: "Sushi Platter",
    nutrition: { calories: 500, protein: 30, carbs: 70, fat: 10 },
    image: "sushi.jpg",
    recordedCategories: ["lunch"]
  },
  {
    id: 5,
    name: "Falafel Bowl",
    nutrition: { calories: 450, protein: 18, carbs: 65, fat: 16 },
    image: "falafel.jpg",
    recordedCategories: []
  },
  {
    id: 6,
    name: "Beef Tacos",
    nutrition: { calories: 600, protein: 28, carbs: 75, fat: 20 },
    image: "tacos.jpg",
    recordedCategories: ["dinner"]
  },
  {
    id: 7,
    name: "Greek Salad",
    nutrition: { calories: 220, protein: 6, carbs: 15, fat: 14 },
    image: "greek_salad.jpg",
    recordedCategories: []
  },
  {
    id: 8,
    name: "Pad Thai",
    nutrition: { calories: 700, protein: 25, carbs: 90, fat: 28 },
    image: "padthai.jpg",
    recordedCategories: ["dinner"]
  },
  {
    id: 9,
    name: "Quinoa Bowl",
    nutrition: { calories: 390, protein: 12, carbs: 65, fat: 10 },
    image: "quinoa.jpg",
    recordedCategories: []
  },
  {
    id: 10,
    name: "Croque Monsieur",
    nutrition: { calories: 520, protein: 20, carbs: 60, fat: 28 },
    image: "croque.jpg",
    recordedCategories: ["breakfast"]
  },
  {
    id: 11,
    name: "Bibimbap",
    nutrition: { calories: 480, protein: 14, carbs: 80, fat: 10 },
    image: "bibimbap.jpg",
    recordedCategories: []
  },
  {
    id: 12,
    name: "Fish and Chips",
    nutrition: { calories: 800, protein: 32, carbs: 85, fat: 40 },
    image: "fishchips.jpg",
    recordedCategories: ["lunch", "dinner"]
  },
  {
    id: 13,
    name: "Shakshuka",
    nutrition: { calories: 300, protein: 12, carbs: 28, fat: 14 },
    image: "shakshuka.jpg",
    recordedCategories: []
  },
  {
    id: 14,
    name: "Pancakes",
    nutrition: { calories: 400, protein: 8, carbs: 72, fat: 10 },
    image: "pancakes.jpg",
    recordedCategories: ["breakfast"]
  },
  {
    id: 15,
    name: "Ratatouille",
    nutrition: { calories: 180, protein: 4, carbs: 20, fat: 8 },
    image: "ratatouille.jpg",
    recordedCategories: []
  },
  {
    id: 16,
    name: "Tom Yum Soup",
    nutrition: { calories: 260, protein: 12, carbs: 32, fat: 6 },
    image: "tomyum.jpg",
    recordedCategories: ["lunch"]
  },
  {
    id: 17,
    name: "Egg Fried Rice",
    nutrition: { calories: 440, protein: 10, carbs: 68, fat: 16 },
    image: "friedrice.jpg",
    recordedCategories: []
  },
  {
    id: 18,
    name: "Caprese Salad",
    nutrition: { calories: 250, protein: 8, carbs: 10, fat: 16 },
    image: "caprese.jpg",
    recordedCategories: ["lunch"]
  },
  {
    id: 19,
    name: "Huevos Rancheros",
    nutrition: { calories: 390, protein: 14, carbs: 38, fat: 18 },
    image: "huevos.jpg",
    recordedCategories: []
  },
  {
    id: 20,
    name: "Butter Chicken",
    nutrition: { calories: 850, protein: 45, carbs: 65, fat: 45 },
    image: "butterchicken.jpg",
    recordedCategories: ["dinner"]
  }
];

// Meal型（最終スキーマ準拠）
const mealTypes: MealCategory[] = ['breakfast', 'lunch', 'dinner', 'snack'];

export const dummyMeals: Meal[] = dummyFoods.map((food, idx) => ({
  mealType: mealTypes[idx % mealTypes.length],
  foods: [food],
  totalNutrition: { ...food.nutrition }
}));