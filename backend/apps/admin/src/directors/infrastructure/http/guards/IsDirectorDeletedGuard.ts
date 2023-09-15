import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { DirectorsService } from '../../../application/services/directors.service';
import { DIRECTORS_SERVICE } from '@admin/directors/domain';

export class IsDirectorDeletedGuard implements CanActivate {
  constructor(
    @Inject(DIRECTORS_SERVICE)
    private readonly directorsService: DirectorsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request.route.path.startsWith('/auth')) return true;
    if (request.route.path.startsWith('/health')) return true;

    if (request.payload.topic === 'Admin') return true;

    const id = request?.payload?.directorId;

    if (typeof id !== 'string') throw new UnauthorizedException();

    const isDeleted = await this.directorsService.isDeleted(id);

    if (isDeleted) throw new UnauthorizedException();

    return true;
  }
}
