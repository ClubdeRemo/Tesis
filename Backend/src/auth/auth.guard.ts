/* eslint-disable prettier/prettier */
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

            // Asigna el payload al objeto request para uso posterior
            request['user'] = payload;

            // Permite el acceso a Admin y Usuario
            if (payload.categoria === 'Admin' || payload.categoria === 'Usuario') {
                console.log(`Access granted to ${payload.categoria}`);
                return true;
            } else {
                console.log('Access denied: User lacks valid rights');
                throw new ForbiddenException('Forbidden resource');
            }
        } catch (error) {
            console.error('Token verification error:', error.message);
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
