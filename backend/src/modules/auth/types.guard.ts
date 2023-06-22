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
export class TypesGuard implements CanActivate {
constructor(
    private jwtService: JwtService,
    private reflector: Reflector
    ) {}

async canActivate(context: ExecutionContext): Promise<boolean> {
    const types = this.reflector.get<string[]>('types', context.getHandler());
    if (!types) {
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
    request.body.directorId = payload.directorId;
    return types.includes(payload?.type);
    } catch {
    throw new UnauthorizedException();
    }
}

private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}
}