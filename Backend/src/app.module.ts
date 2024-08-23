import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BotesModule } from './botes/botes.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),}),
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost', 
      port: 3306, 
      username: 'root', 
      password: 'root', 
      database: 'club_de_remo', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'], 
      charset: 'utf8mb4',
      //synchronize: true, // Sincroniza las entidades con la base de datos (solo para desarrollo) // CAUSA PROBLEMAS CON LAS ENTIDADES
      }),
      ProductModule,
    UserModule,
    AuthModule,
    BotesModule
    ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}