import { Module } from '@nestjs/common';
import { BotesService } from './botes.service';
import { BotesController } from './botes.controller';

@Module({
  controllers: [BotesController],
  providers: [BotesService],
})
export class BotesModule {}
