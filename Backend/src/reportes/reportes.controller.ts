import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { MensajeDto } from './reportes.dto';

@Controller('reportes')
export class ReportesController {
    constructor(private readonly reportesService: ReportesService) {}

    @Post()
    async create(@Body() MensajeDto: MensajeDto) {
        return this.reportesService.create(MensajeDto);
    }
}