import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsIn,
  ValidateNested,
  IsObject,
} from "class-validator";
import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";
import { MEAL_CATEGORIES, WEEKDAYS } from "@/shared/constants/meals.constants";

/** 栄養情報 */
export class NutritionDto {
  @ApiProperty({ example: 250 })
  @IsNumber()
  calories!: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  protein!: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  carbs!: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  fat!: number;
}

/** Food の最小 DTO（フロントが期待するフィールドを中心に） */
export class FoodDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id!: number;

  @ApiProperty({ example: "Apple" })
  @IsString()
  name!: string;

  @ApiProperty({ type: NutritionDto })
  @ValidateNested()
  @Type(() => NutritionDto)
  nutrition!: NutritionDto;

  @ApiProperty({ example: "/images/apple.png" })
  @IsString()
  image!: string;

  @ApiProperty({ type: [String], enum: MEAL_CATEGORIES })
  @IsArray()
  @IsIn(MEAL_CATEGORIES as any, { each: true })
  recordedCategories!: string[]; // validated against MEAL_CATEGORIES
}

/** Meal（カテゴリごとの食事単位） */
export class MealDto {
  @ApiProperty({ enum: MEAL_CATEGORIES, example: "breakfast" })
  @IsString()
  @IsIn(MEAL_CATEGORIES as any)
  mealType!: string;

  @ApiProperty({ type: [FoodDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FoodDto)
  foods!: FoodDto[];

  @ApiProperty({ type: NutritionDto })
  @ValidateNested()
  @Type(() => NutritionDto)
  totalNutrition!: NutritionDto;
}

/** 1日の食事（カテゴリごと） */
export class DailyMealsDto {
  @ApiPropertyOptional({ type: [MealDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MealDto)
  breakfast?: MealDto[];

  @ApiPropertyOptional({ type: [MealDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MealDto)
  lunch?: MealDto[];

  @ApiPropertyOptional({ type: [MealDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MealDto)
  dinner?: MealDto[];

  @ApiPropertyOptional({ type: [MealDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MealDto)
  snack?: MealDto[];

  @ApiPropertyOptional({ type: NutritionDto, description: "カテゴリ合計の栄養情報" })
  @IsOptional()
  @ValidateNested()
  @Type(() => NutritionDto)
  totalNutrition?: NutritionDto;
}

/** 1週間分（曜日ごとにプロパティを定義） */
export class WeeklyMealsDto {
  @ApiPropertyOptional({ type: DailyMealsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DailyMealsDto)
  monday?: DailyMealsDto;

  @ApiPropertyOptional({ type: DailyMealsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DailyMealsDto)
  tuesday?: DailyMealsDto;

  @ApiPropertyOptional({ type: DailyMealsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DailyMealsDto)
  wednesday?: DailyMealsDto;

  @ApiPropertyOptional({ type: DailyMealsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DailyMealsDto)
  thursday?: DailyMealsDto;

  @ApiPropertyOptional({ type: DailyMealsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DailyMealsDto)
  friday?: DailyMealsDto;

  @ApiPropertyOptional({ type: DailyMealsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DailyMealsDto)
  saturday?: DailyMealsDto;

  @ApiPropertyOptional({ type: DailyMealsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DailyMealsDto)
  sunday?: DailyMealsDto;
}

/**
 * UpdateRecordDto
 *
 * - 食事記録を更新するための DTO。部分更新を想定して各フィールドは optional。
 */
export class UpdateRecordDto {
  @ApiPropertyOptional({
    description: "一週間分の食事データ。曜日ごとに dailyMeals を渡します（partial 更新可能）",
    type: WeeklyMealsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => WeeklyMealsDto)
  weeklyMeals?: WeeklyMealsDto;

  @ApiPropertyOptional({
    description: "更新対象のユーザー ID（必要に応じて）",
    example: 123,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number;

  @ApiPropertyOptional({
    description: "任意のメタ情報（予約フィールドなど）",
    type: Object,
  })
  @IsOptional()
  @IsObject()
  meta?: Record<string, unknown>;
}