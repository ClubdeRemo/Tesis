import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutModule } from './produt/produt.module';
import { UserModule } from './user/user.module';


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
      synchronize: true, // Sincroniza las entidades con la base de datos (solo para desarrollo)
      }),
      ProdutModule,
    UserModule
    ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}