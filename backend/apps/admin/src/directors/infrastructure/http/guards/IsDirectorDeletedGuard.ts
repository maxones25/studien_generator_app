import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IIsDirectorDeletedUseCase,
  IS_DIRECTOR_DELETED_USE_CASE,
} from '@admin/directors/domain';

export class IsDirectorDeletedGuard implements CanActivate {
  constructor(
    @Inject(IS_DIRECTOR_DELETED_USE_CASE)
    private readonly isDirectorDeletedUseCase: IIsDirectorDeletedUseCase,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request.route.path.startsWith('/auth')) return true;
    if (request.route.path.startsWith('/health')) return true;

    if (request.payload.topic === 'Admin') return true;

    const directorId = request?.payload?.directorId;

    if (typeof directorId !== 'string') throw new UnauthorizedException();

    const isDeleted = await this.isDirectorDeletedUseCase.execute({
      directorId,
    });

    if (isDeleted) throw new UnauthorizedException();

    return true;
  }
}
