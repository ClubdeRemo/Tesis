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
        throw new UnauthorizedException();
    }
    try {
        const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
        });

        console.log('Payload:', payload); 

        request['user'] = payload;

        if (payload.user === 'Lucas') {
        console.log('Access granted to Lucas');
        return true;
        } else {
        console.log('Access denied: Forbidden resource');
        throw new ForbiddenException('Forbidden resource');
        }
    } catch (error) {
        console.error('Token verification error:', error);
        throw new UnauthorizedException('Invalid token');
    }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
    }
}