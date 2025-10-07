import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsIn,
  ValidateNested,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { MEAL_CATEGORIES } from "@/shared/constants/meals.constants";

export class GetFoodRequestDto {
  @ApiPropertyOptional({ description: "tab: select | history | search", example: "search" })
  @IsOptional()
  @IsString()
  @IsIn(["select", "history", "search"])
  tab?: string;

  @ApiPropertyOptional({ description: "検索クエリ (q)", example: "apple" })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ description: "カテゴリ (history タブで利用)", example: "breakfast" })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: "ids カンマ区切り (select タブで利用)、例: 1,2,3",
    example: "1,2,3",
  })
  @IsOptional()
  @IsString()
  ids?: string;
}

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

/** Food のレスポンス表現 */
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
  recordedCategories!: string[];
}

export class GetFoodResponseDto {
  @ApiProperty({ type: [FoodDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FoodDto)
  results!: FoodDto[];
}