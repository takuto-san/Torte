import { Injectable } from '@nestjs/common';
import { dummyFoods } from './dummy-foods';

@Injectable()
export class FoodService {
  searchFoods(params) {
    let foods = dummyFoods;

    if (params.query) {
      foods = foods.filter((food) =>
        food.name.toLowerCase().includes(params.query.toLowerCase()),
      );
    }

    if (params.category && params.category !== '') {
      foods = foods.filter(
        (food) =>
          Array.isArray(food.recordedCategories) &&
          food.recordedCategories.includes(params.category as string),
      );
    }

    switch (params.tab) {
      case 'history':
        foods = foods.filter((food) => food.isRecorded === true);
        break;
      case 'select':
        foods = foods.filter((food) => food.isRecorded === false);
        break;
      case 'search':
        break;
      default:
        break;
    }

    return foods;
  }
}
