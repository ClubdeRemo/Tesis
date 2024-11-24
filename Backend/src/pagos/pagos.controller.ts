import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePagosDto } from './dto/create-pago.dto';
import { PagoService } from './pagos.service';
import { Pagos } from './entities/pago.entity';

@Controller('historial/pagos')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  async crearPago(@Body() createPagoDto: CreatePagosDto): Promise<Pagos> {
    return this.pagoService.crearPago(createPagoDto);
  }

  @Get('/:UserId')
  async obtenerPagos(@Param('UserId') UserId: number): Promise<Pagos[]> {
    return this.pagoService.obtenerPagosPorUsuario(UserId);
  }
}
