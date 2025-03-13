/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BotesModule } from './botes/botes.module';
import { ReportesModule } from './reportes/reportes.module';
import { PagoModule } from './pagos/pagos.module';
import { AppDataSource } from './ormconfig';
import { ConfigModule } from'@nestjs/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'Client', 'src'),
      serveRoot: '/static',
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Hace que todas las variables estén disponibles en toda la app
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    AuthModule,
    BotesModule,
    ReportesModule,
    PagoModule
    ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}