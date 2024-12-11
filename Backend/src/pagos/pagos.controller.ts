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
  async obtenerPagos(@Param('UserId') UserId: string): Promise<{ pagos: Pagos[]; estado: string }> {
      if (UserId === 'todos') {
          // Aquí llamas al servicio para obtener todos los pagos
          const pagos = await this.pagoService.obtenerPagosHoy();
          return { pagos, estado: 'OK' };
      } else {
          // Aquí llamas al servicio para obtener los pagos de un usuario específico
          const pagos = await this.pagoService.obtenerPagosPorUsuario(Number(UserId));
          const estado = await this.pagoService.calcularEstado(Number(UserId));
          await this.pagoService.actualizarEstadoSocio(Number(UserId));
          return { pagos, estado };
      }
  }
  


}