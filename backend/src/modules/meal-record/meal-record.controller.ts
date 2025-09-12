import {
  Body,
  Controller,
  Post,
  Get,
} from '@nestjs/common';import { AppService } from './meal-record.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}