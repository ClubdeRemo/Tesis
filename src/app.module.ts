import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost', 
      port: 3306, 
      username: 'root', 
      password: 'root', 
      database: 'firstApi', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'], 
      //synchronize: true, // Sincroniza las entidades con la base de datos (solo para desarrollo) // CAUSA PROBLEMAS CON LAS ENTIDADES
      }),
      ProductModule,
    UserModule,
    AuthModule
    ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}