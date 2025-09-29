// user.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UserController {
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found.' })
  getUser(@Param('id') id: string) {
    return { id, name: 'John Doe' };
  }
}
