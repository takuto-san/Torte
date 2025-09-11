import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sample')
  @ApiOperation({ summary: 'Get sample data' })
  @ApiResponse({ status: 200, description: 'Success' })
  getSampleData() {
    return { message: 'Sample data' };
  }
}