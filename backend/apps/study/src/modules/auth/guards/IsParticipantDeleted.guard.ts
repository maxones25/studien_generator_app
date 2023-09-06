import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

export class IsParticipantDeletedGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request.route.path.startsWith('/auth')) return true;
    if (request.route.path.startsWith('/health')) return true;

    const id = request?.payload?.participantId;

    if (typeof id !== 'string') throw new UnauthorizedException();

    const isDeleted = await this.authService.isDeleted(id);

    if (isDeleted) throw new UnauthorizedException();

    return true;
  }
}