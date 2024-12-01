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
  async obtenerPagos(@Param('UserId') UserId: number): Promise<{ pagos: Pagos[]; estado: string }> {
    const pagos = await this.pagoService.obtenerPagosPorUsuario(UserId);
    const estado = await this.pagoService.calcularEstado(UserId);


      // Sincroniza el estado en la base de datos antes de devolver la respuesta
    await this.pagoService.actualizarEstadoSocio(UserId);


    
    return { pagos, estado }; // Devuelve pagos y estado en UN SOLO OBJETO
  }
}