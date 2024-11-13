import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(private jwtService: JwtService) {}

async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
        throw new UnauthorizedException('No token provided');
    }
    try {
        const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
        });

        console.log('Payload:', payload); 

        request['user'] = payload;

        if (payload.categoria === 'Admin') {
        console.log('Access granted to Admin');
        return true;
        } else {
        console.log('Access denied: User lacks admin rights');
        throw new ForbiddenException('Forbidden resource');
        }
    } catch (error) {
        console.error('Token verification error:', error.message);
        throw new UnauthorizedException('Invalid or expired token');
    }
    }

    private extractTokenFromHeader(request: Request): string | undefined { //divide el valor del encabezado Authorization en un array de dos partes: ["Bearer", "<token>"].
    const [type, token] = request.headers.authorization?.split(' ') ?? []; // usa un array vacío como valor predeterminado si el encabezado Authorization es undefined, previniendo errores si el encabezado está ausente.
    return type === 'Bearer' ? token : undefined;
    }
    //request.headers.authorization busca el encabezado Authorization de la solicitud HTTP.
    //Este encabezado debe tener la forma de "Bearer <token>", donde <token> es el token JWT.
}