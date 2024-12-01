import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { MensajeDto } from './reportes.dto';

@Controller('reportes')
export class ReportesController {
    constructor(private readonly reportesService: ReportesService) {}

    @Post()
    async create(@Body() MensajeDto: MensajeDto) {
        // Asigna la fecha actual si no está presente en el DTO
        const mensajeConFecha = {
            ...MensajeDto,
            Fecha: new Date(),  // Fecha actual
        };
    
        return this.reportesService.create(mensajeConFecha);
    }

    @Delete(':IdMensaje')
    async eliminarMensaje(@Param('IdMensaje') IdMensaje: string): Promise<{ message: string }> {
    await this.reportesService.eliminarMensaje(IdMensaje);
    return { message: 'Mensaje eliminado correctamente' };
}
    @Get()
    async obtenerMensaje() {
    return this.reportesService.findAll();
    }

    // Ruta para modificar el mensaje
    @Put('modificar/:IdMensaje')
    async modificarMensaje(
    @Param('IdMensaje') IdMensaje: number,
    @Body('Mensaje') nuevoMensaje: string,
    ) {
    return this.reportesService.modificarMensaje(IdMensaje, nuevoMensaje);
    }
}