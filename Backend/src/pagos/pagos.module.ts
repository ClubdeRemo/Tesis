import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoService } from './pagos.service'; // Corregido: 'PagoService'
import { PagoController } from './pagos.controller'; // Corregido: 'PagoController'
import { Pagos } from './entities/pago.entity';
import { User } from 'src/user/entities/user.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Pagos, User]), ScheduleModule.forRoot()],
  providers: [PagoService], // Corregido: 'PagoService'
  controllers: [PagoController], // Corregido: 'PagoController'
})
export class PagoModule {} // Corregido: 'PagoModule'
