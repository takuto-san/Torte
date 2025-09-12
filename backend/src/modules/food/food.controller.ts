import {
  Body,
  Controller,
  Post,
  Get,
} from '@nestjs/common';import { AppService } from './food.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}