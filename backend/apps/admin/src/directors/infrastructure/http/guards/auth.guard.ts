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

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (typeof request?.headers?.authorization !== 'string') return undefined;
    const [type, token] = request.headers.authorization.split(' ');
    if (type !== 'Bearer' || token === '') return undefined;
    return token;
  }
}
