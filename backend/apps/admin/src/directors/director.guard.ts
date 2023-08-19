import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { DirectorsRepository } from './directors.repository';

@Injectable()
export class DirectorGuard implements CanActivate {
  constructor(
    @Inject(DirectorsRepository)
    private readonly directorsRepository: DirectorsRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const id = request.query.directorId;

    
    if (typeof id !== 'string') throw new UnauthorizedException();

    
    const director = await this.directorsRepository.findOne({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      }
    });
    
    if (!director) throw new UnauthorizedException();

    (request as any).director = director;

    return true;
  }
}
