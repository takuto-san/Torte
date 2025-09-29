import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FoodModule } from './modules/food/food.module';

@Module({
  imports: [AuthModule, UserModule, FoodModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
