/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { config } from 'dotenv';
config({ path: '.env/.env.development.local' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  const corsOptions: CorsOptions = {
    origin: [
      'http://localhost:4200', // Para desarrollo local
      'http://tesis-club.vercel.app', // Producción en Vercel
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: false, // Si fuese false permite enviar cookies o headers de autenticación

  };
  app.enableCors(corsOptions);

  await app.listen(process.env.PORT || 3000);
  console.log('DATABASE_URL:', process.env.DATABASE_URL);

}
bootstrap();
