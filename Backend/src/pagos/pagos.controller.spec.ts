import { Test, TestingModule } from '@nestjs/testing';
import { PagoController } from './pagos.controller';
import { PagoService } from './pagos.service';

describe('PagosController', () => {
  let controller: PagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagoController],
      providers: [PagoService],
    }).compile();

    controller = module.get<PagoController>(PagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
