import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    const { Id, Nombre, Contraseña } = signInDto;
    const token = await this.authService.signIn(Id, Nombre, Contraseña);
    const user = await this.authService.getUserById(Id); // Método implementado abajo
    console.log(token);
    return {
      token,
      user: {
        id: user.Id,
        nombre: user.Nombre,
        rol: user.Categorias,
      },
    };
    
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub; // Extrae el ID del usuario desde el token
    const user = await this.authService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Lógica según el rol
    if (user.Categorias === 'Admin') {
      return {
        message: 'Acceso de administrador',
        user: {
          id: user.Id,
          nombre: user.Nombre,
          rol: user.Categorias,
          email: user.Email,
          fechaRegistro: user.FechaRegistro,
        },
      };
    } else if (user.Categorias === 'Usuario') {
      return {
        message: 'Acceso de usuario',
        user: {
          id: user.Id,
          nombre: user.Nombre,
          rol: user.Categorias,
        },
      };
    } else {
      throw new UnauthorizedException('Rol no reconocido');
    }
  }
}
