/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { jwtConstants} from './constants'

@Module({
  imports:[
    JwtModule.register({
      global : true,
      secret : jwtConstants.secret,
//      secretOrPrivateKey : jwtConstants.secret,
      signOptions : {expiresIn: ('120s')}
    }),
    UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
