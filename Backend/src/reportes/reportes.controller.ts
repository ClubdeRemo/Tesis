import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
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
    

    @Get()
    async findAll() {
        return this.reportesService.findAll();
    }
}