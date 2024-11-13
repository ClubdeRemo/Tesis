import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(Id: number, Nombre: string, Contraseña: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(Id);

    // Verificar que el usuario existe y que el nombre coincide
    if (!user || user.Nombre !== Nombre) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Comparar la contraseña en texto plano con el hash almacenado
    const isPasswordMatch = await bcrypt.compare(Contraseña, user.Contraseña);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Verificar que el usuario tenga la categoría "admin"
    if (user.Categorias !== 'Admin') {
      throw new UnauthorizedException('Acceso restringido a usuarios administradores');
    }

    // Generar y devolver el token JWT si la autenticación es exitosa
    const payload = { sub: user.Id, user: user.Nombre, categoria: user.Categorias };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
