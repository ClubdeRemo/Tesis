import { Test, TestingModule } from '@nestjs/testing';
import { BotesController } from './botes.controller';
import { BotesService } from './botes.service';

describe('BotesController', () => {
  let controller: BotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotesController],
      providers: [BotesService],
    }).compile();

    controller = module.get<BotesController>(BotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
