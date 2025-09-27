import { Injectable } from '@nestjs/common';
import { dummyFoods } from './dummy-foods';

@Injectable()
export class FoodService {
  searchFoods(query: string) {
    if (!query) return dummyFoods;
    return dummyFoods.filter(food =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}