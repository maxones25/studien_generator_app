import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { EntityField } from '../../../../entities/entity-field.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EntityFieldGuard implements CanActivate {
  constructor(
    @InjectRepository(EntityField)
    private readonly entityFieldsRepository: Repository<EntityField>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const entityId = request.params.entityId;
    const fieldId = request.params.fieldId;

    if (!studyId) throw new UnauthorizedException();
    if (!entityId) throw new UnauthorizedException();
    if (!fieldId) return true;

    const entityField = await this.entityFieldsRepository.findOne({
      where: { entityId, id: fieldId, entity: { studyId } },
    });

    if (!entityField) throw new UnauthorizedException();

    return true;
  }
}
