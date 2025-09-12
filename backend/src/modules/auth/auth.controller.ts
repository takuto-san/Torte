import {
  Body,
  Controller,
  Post,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('hello')
  getHello(): string {
    return this.authService.getHello();
  }

  // 例：ログインAPIを追加
  @Post('login')
  login(@Body() body: { username: string; password: string }): string {
    return this.authService.login(body.username, body.password);
  }
}