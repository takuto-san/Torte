import { Controller, Get, Query } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  searchFoods(
    @Query('tab') tab: string,
    @Query('q') query: string,
    @Query('category') category?: string,
  ) {
    return this.foodService.searchFoods({ tab, query, category });
  }
}
