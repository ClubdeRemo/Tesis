import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePagosDto } from './dto/create-pago.dto';
import { PagoService } from './pagos.service';
import { Pagos } from './entities/pago.entity';

@Controller('Pagos')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  async crearPago(@Body() createPagoDto: CreatePagosDto): Promise<Pagos> {
    return this.pagoService.crearPago(createPagoDto);
  }

  @Get(':userId')
  async obtenerPagos(@Param('userId') userId: number): Promise<Pagos[]> {
    return this.pagoService.obtenerPagosPorUsuario(userId);
  }
}
