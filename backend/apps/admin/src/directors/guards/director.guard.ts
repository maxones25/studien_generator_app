import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { DirectorsService } from '../directors.service';

@Injectable()
export class DirectorGuard implements CanActivate {
  constructor(
    @Inject(DirectorsService)
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
