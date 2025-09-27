'use client'
import { Header } from '@/components/organisms/header/page'
import { DateSelector } from '@/components/molecules/date-selector/page'
import { MealTypeSelector } from '@/components/molecules/meal-type-selector/page'
import { InputForm } from '@/components/molecules/input-form/page'
import { TabNavigation } from '@/components/molecules/tab-navigation/page'
import { TabContent } from '@/components/organisms/tab-content/page'
import type { Meal, Food } from '@/types/mealTypes'

// ダミーレシピ
const dummyRecipe: Food = {
  id: 1,
  name: 'Dummy Curry',
  cuisine: 'Japanese',
  dietaryTags: ['vegan'],
  difficulty: 'easy',
  nutrition: { calories: 300, protein: 10, carbs: 50, fat: 5 },
  servings: 2,
  image: 'https://placehold.jp/150x150.png',
};

// ダミーMeal配列
const dummyMeals: Meal[] = [
  {
    id: 1,
    mealType: 'breakfast',
    food: dummyRecipe,
    servings: 2,
  },
  {
    id: 2,
    mealType: 'lunch',
    food: {
      ...dummyRecipe,
      id: 2,
      name: 'Dummy Salad',
      cuisine: 'Western',
      nutrition: { calories: 120, protein: 3, carbs: 20, fat: 4 },
      servings: 1,
    },
    servings: 1,
  },
];

export const RecordPageLayout = () => {
  const onToggle = (id: number) => {
    console.log('Toggle meal:', id);
  };
  const isSelectedFn = (id: number) => false;

  return (
    <div>
      <Header />
      <DateSelector />
      <MealTypeSelector />
      <InputForm />
      <TabNavigation />
      <TabContent
        id={1}
        searchQuery=""
        items={dummyMeals}
        onToggle={onToggle}
        isSelectedFn={isSelectedFn}
      />
    </div>
  );
};