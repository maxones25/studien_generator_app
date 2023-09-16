import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import {
  GET_DIRECTOR_BY_ID_USE_CASE,
  IGetDirectorByIdUseCase,
} from '@admin/directors/domain';

@Injectable()
export class DirectorGuard implements CanActivate {
  constructor(
    @Inject(GET_DIRECTOR_BY_ID_USE_CASE)
    private readonly getDirectorByIdUseCase: IGetDirectorByIdUseCase,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const directorId = request.query.directorId;

    if (typeof directorId !== 'string') throw new UnauthorizedException();

    const director = await this.getDirectorByIdUseCase.execute({ directorId });

    if (!director) throw new UnauthorizedException();

    (request as any).director = director;

    return true;
  }
}
