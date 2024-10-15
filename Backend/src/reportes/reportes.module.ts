import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesController } from './reportes.controller';
import { Mensajes } from './reportes.entity';
import { ReportesService } from './reportes.service';


@Module({
    imports: [TypeOrmModule.forFeature([Mensajes])], //Para caracteristicas y la tabla con la que vamos a trabajar 
    controllers: [ReportesController],
    providers: [ReportesService],
    exports: [ReportesService]
})
export class ReportesModule {}
