import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { DirectorsService } from '../../../application';
import { DIRECTORS_SERVICE } from '@admin/directors/domain';

@Injectable()
export class DirectorGuard implements CanActivate {
  constructor(
    @Inject(DIRECTORS_SERVICE)
    private readonly directorsService: DirectorsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const id = request.query.directorId;

    if (typeof id !== 'string') throw new UnauthorizedException();

    const director = await this.directorsService.getById(id);

    if (!director) throw new UnauthorizedException();

    (request as any).director = director;

    return true;
  }
}
