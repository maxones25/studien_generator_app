import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { DirectorsService } from '../directors.service';

export class IsDirectorDeletedGuard implements CanActivate {
  constructor(
    @Inject(DirectorsService)
    private readonly directorsService: DirectorsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request.route.path.startsWith('/auth')) return true;
    if (request.route.path.startsWith('/health')) return true;
    if (request.method === "POST" && request.route.path.startsWith('/directors')) return true;

    const id = request?.payload?.directorId;

    if (typeof id !== 'string') throw new UnauthorizedException();

    const isDeleted = await this.directorsService.isDeleted(id);

    if (isDeleted) throw new UnauthorizedException();

    return true;
  }
}
