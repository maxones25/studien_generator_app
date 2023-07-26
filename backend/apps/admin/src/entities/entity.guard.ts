import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { EntitiesRepository } from './entities.repository';

@Injectable()
export class EntityGuard implements CanActivate {
  constructor(
    @Inject(EntitiesRepository)
    private readonly entitiesRepository: EntitiesRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const entityId = request.params.entityId;

    if (!studyId) throw new UnauthorizedException();
    if (!entityId) return true;

    const entity = await this.entitiesRepository.findOne({
      where: { studyId, id: entityId },
    });

    if (!entity) throw new UnauthorizedException();

    return true;
  }
}
