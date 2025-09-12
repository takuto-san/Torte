import { Module } from '@nestjs/common';
import { AppController } from './food.controller';
import { AppService } from './food.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
