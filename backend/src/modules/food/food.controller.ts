import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}
  
  @Get('search')
  searchFoods(@Query('q') query: string) {
    return this.foodService.searchFoods(query);
  }
}