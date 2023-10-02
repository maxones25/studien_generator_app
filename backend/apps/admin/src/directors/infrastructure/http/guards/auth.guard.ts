import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ITokenService, TOKEN_SERVICE } from '@shared/modules/token';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_SERVICE)
    private tokenService: ITokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.route.path.startsWith('/auth')) return true;
    if (request.route.path.startsWith('/health')) return true;

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.tokenService.verify(token);
      request.payload = payload;
    } catch {
      throw new UnauthorizedException();
    }

    if (typeof request.payload.topic !== 'string')
      throw new UnauthorizedException();

    const topic = request.payload.topic;

    if (topic === 'Admin') {
    } else if (topic === 'Director') {
      if (typeof request.payload.directorId !== 'string')
        throw new UnauthorizedException();
    } else {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (typeof request?.headers?.authorization !== 'string') return undefined;
    const [type, token] = request.headers.authorization.split(' ');
    if (type !== 'Bearer' || token === '') return undefined;
    return token;
  }
}
