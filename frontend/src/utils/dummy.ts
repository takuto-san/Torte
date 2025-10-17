import { Food, Meal, MealCategory } from "@/types/foodTypes";

// Food型（最終スキーマ準拠）
export const dummyFoods: Food[] = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    nutrition: { calories: 650, protein: 22, carbs: 80, fat: 24, salt: 2 },
    image: "carbonara.jpg",
    recordedCategories: [],
    category: ""
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    nutrition: { calories: 350, protein: 10, carbs: 60, fat: 8, salt: 2 },
    image: "stirfry.jpg",
    recordedCategories: ["lunch", "dinner"],
    category: ""
  },
  {
    id: 3,
    name: "Chicken Tikka Masala",
    nutrition: { calories: 720, protein: 40, carbs: 55, fat: 32, salt: 2 },
    image: "tikka.jpg",
    recordedCategories: [],
    category: ""
  },
  {
    id: 4,
    name: "Sushi Platter",
    nutrition: { calories: 500, protein: 30, carbs: 70, fat: 10, salt: 2 },
    image: "sushi.jpg",
    recordedCategories: ["lunch"],
    category: ""
  },
  {
    id: 5,
    name: "Falafel Bowl",
    nutrition: { calories: 450, protein: 18, carbs: 65, fat: 16, salt: 2 },
    image: "falafel.jpg",
    recordedCategories: [],
    category: ""
  },
  {
    id: 6,
    name: "Beef Tacos",
    nutrition: { calories: 600, protein: 28, carbs: 75, fat: 20, salt: 2 },
    image: "tacos.jpg",
    recordedCategories: ["dinner"],
    category: ""
  },
  {
    id: 7,
    name: "Greek Salad",
    nutrition: { calories: 220, protein: 6, carbs: 15, fat: 14, salt: 2 },
    image: "greek_salad.jpg",
    recordedCategories: [],
    category: ""
  },
  {
    id: 8,
    name: "Pad Thai",
    nutrition: { calories: 700, protein: 25, carbs: 90, fat: 28, salt: 2 },
    image: "padthai.jpg",
    recordedCategories: ["dinner"],
    category: ""
  },
  {
    id: 9,
    name: "Quinoa Bowl",
    nutrition: { calories: 390, protein: 12, carbs: 65, fat: 10, salt: 2 },
    image: "quinoa.jpg",
    recordedCategories: [],
    category: ""
  },
  {
    id: 10,
    name: "Croque Monsieur",
    nutrition: { calories: 520, protein: 20, carbs: 60, fat: 28, salt: 2 },
    image: "croque.jpg",
    recordedCategories: ["breakfast"],
    category: ""
  },
  {
    id: 11,
    name: "Bibimbap",
    nutrition: { calories: 480, protein: 14, carbs: 80, fat: 10, salt: 2 },
    image: "bibimbap.jpg",
    recordedCategories: [],
    category: ""
  },
  {
    id: 12,
    name: "Fish and Chips",
    nutrition: { calories: 800, protein: 32, carbs: 85, fat: 40, salt: 2 },
    image: "fishchips.jpg",
    recordedCategories: ["lunch", "dinner"],
    category: ""
  },
  {
    id: 13,
    name: "Shakshuka",
    nutrition: { calories: 300, protein: 12, carbs: 28, fat: 14, salt: 2 },
    image: "shakshuka.jpg",
    recordedCategories: [],
    category: ""
  },
  {
    id: 14,
    name: "Pancakes",
    nutrition: { calories: 400, protein: 8, carbs: 72, fat: 10, salt: 2 },
    image: "pancakes.jpg",
    recordedCategories: ["breakfast"],
    category: ""
  },
  {
    id: 15,
    name: "Ratatouille",
    nutrition: { calories: 180, protein: 4, carbs: 20, fat: 8, salt: 2 },
    image: "ratatouille.jpg",
    recordedCategories: [],
    category: ""
  },
  {
    id: 16,
    name: "Tom Yum Soup",
    nutrition: { calories: 260, protein: 12, carbs: 32, fat: 6, salt: 2 },
    image: "tomyum.jpg",
    recordedCategories: ["lunch"],
    category: ""
  },
  {
    id: 17,
    name: "Egg Fried Rice",
    nutrition: { calories: 440, protein: 10, carbs: 68, fat: 16, salt: 2 },
    image: "friedrice.jpg",
    recordedCategories: [],
    category: ""
  },
  {
    id: 18,
    name: "Caprese Salad",
    nutrition: { calories: 250, protein: 8, carbs: 10, fat: 16, salt: 2 },
    image: "caprese.jpg",
    recordedCategories: ["lunch"],
    category: ""
  },
  {
    id: 19,
    name: "Huevos Rancheros",
    nutrition: { calories: 390, protein: 14, carbs: 38, fat: 18, salt: 2 },
    image: "huevos.jpg",
    recordedCategories: [],
    category: ""
  },
  {
    id: 20,
    name: "Butter Chicken",
    nutrition: { calories: 850, protein: 45, carbs: 65, fat: 45, salt: 2 },
    image: "butterchicken.jpg",
    recordedCategories: ["dinner"],
    category: ""
  },
];

// Meal型（最終スキーマ準拠）
const mealTypes: MealCategory[] = ["breakfast", "lunch", "dinner", "snack"];

export const dummyMeals: Meal[] = dummyFoods.map((food, idx) => ({
  mealType: mealTypes[idx % mealTypes.length],
  foods: [food],
  totalNutrition: { ...food.nutrition },
}));