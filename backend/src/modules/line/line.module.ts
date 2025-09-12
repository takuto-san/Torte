import { Module } from '@nestjs/common';
import { AppController } from './line.controller';
import { AppService } from './line.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
