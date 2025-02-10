
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthService {

  private tokenKey = 'token'; 

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

    // Generar el token JWT con la categoría del usuario
    const payload = { sub: user.Id, user: user.Nombre, categoria: user.Categorias };
    return {
      access_token: this.jwtService.sign(payload),
    };
    
  }

  
  async getUserById(id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

   // Método para guardar el token en localStorage
   saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para decodificar el token y obtener datos del usuario
  private decodeToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token); // Llamada directa, sin `.default`
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }
  // Método para obtener el UserId desde el token
  getUserIdFromToken(): string | null {
    const decoded = this.decodeToken();
    return decoded ? decoded.Id : null;
  }

  // Método para obtener la categoría del usuario desde el token
  getUserCategoryFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      return decoded.categoria; // Asegúrate de que el campo sea correcto
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
