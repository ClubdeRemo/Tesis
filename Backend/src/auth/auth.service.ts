/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    Id: number,
    Nombre: string,
    Contraseña: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(Id);
    const payload = { sub: user.Id, user: user.Nombre };
    console.log(payload);
    return {
      access_token : await this.jwtService.sign(payload)
    };
  }
}