import { Module } from '@nestjs/common';
import { AppController } from './meal-record.controller';
import { AppService } from './meal-record.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
