/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { config } from 'dotenv';
config({ path: '.env/.env.development.local' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  const corsOptions: CorsOptions = {
    origin: 'http://tesis-club-gz3ksabkt-lucas-esteban-matias-projects.vercel.app', // Ajusta esta URL al frontend que quieras permitir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  };
  app.enableCors(corsOptions);

  await app.listen(process.env.PORT || 3000);
  console.log('DATABASE_URL:', process.env.DATABASE_URL);

}
bootstrap();
