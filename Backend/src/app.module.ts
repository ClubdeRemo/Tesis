/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
//import { ServeStaticModule } from '@nestjs/serve-static';
//import { join } from 'path';
import { BotesModule } from './botes/botes.module';
import { ReportesModule } from './reportes/reportes.module';
import { PagoModule } from './pagos/pagos.module';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './ormconfig';
import * as dotenv from 'dotenv';


console.log('DATABASE_URL:', process.env.DATABASE_URL);

ConfigModule.forRoot({
  envFilePath: ['.env.development.local', '.env/.env.development.local'],
  isGlobal: true,
});


@Module({
  imports: [
/*     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'Client', 'dist', 'Client', 'browser'), // ✅ el build correcto de Angular
      serveRoot: '/static',
    }), */

    
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    AuthModule,
    BotesModule,
    ReportesModule,
    PagoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
