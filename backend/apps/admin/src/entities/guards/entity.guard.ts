import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Entity } from '@entities/entity.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EntityGuard implements CanActivate {
  constructor(
    @InjectRepository(Entity)
    private readonly entitiesRepository: Repository<Entity>,
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
