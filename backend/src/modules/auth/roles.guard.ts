import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
  
@Injectable()
export class RolesGuard implements CanActivate {
constructor(
    private jwtService: JwtService,
    private reflector: Reflector
    ) {}

async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
    throw new UnauthorizedException();
    }
    try {
    const payload = await this.jwtService.verifyAsync(
        token,
        {
        secret: process.env.JWT_SECRET
        }
    );
    return roles.includes(payload?.role);
    } catch {
    throw new UnauthorizedException();
    }
}

private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}
}