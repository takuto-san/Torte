import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello World!';
  }

  // 例：ログインのダミーメソッド
  login(username: string, password: string): string {
    // 本来は認証ロジックを書く
    if (username === 'test' && password === 'pass') {
      return 'Login success!';
    }
    return 'Login failed!';
  }
}
