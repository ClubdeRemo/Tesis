import { Test, TestingModule } from '@nestjs/testing';
import { BotesService } from './botes.service';

describe('BotesService', () => {
  let service: BotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotesService],
    }).compile();

    service = module.get<BotesService>(BotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
