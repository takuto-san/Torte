import { Injectable } from '@nestjs/common';
import { dummyFoods } from './dummy-foods';
import type { SearchParams, MealCategory, Food } from './food.type';

@Injectable()
export class FoodService {
  searchFoods(params: SearchParams): Food[] {
    let foods = dummyFoods;

    if (params.query) {
      foods = foods.filter(food =>
        food.name.toLowerCase().includes(params.query.toLowerCase())
      );
    }

    if (params.category && params.category !== '') {
      foods = foods.filter(food =>
        Array.isArray(food.recordedCategories) &&
        food.recordedCategories.includes(params.category as MealCategory)
      );
    }

    switch (params.tab) {
      case 'history':
        foods = foods.filter(food => food.isRecorded === true);
        break;
      case 'select':
        foods = foods.filter(food => food.isRecorded === false);
        break;
      case 'search':
        break;
      default:
        break;
    }

    return foods;
  }
}