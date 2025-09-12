import { Module } from '@nestjs/common';
import { AppController } from './character.controller';
import { AppService } from './character.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
