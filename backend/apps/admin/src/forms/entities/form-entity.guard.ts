import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FormEntitiesRepository } from './form-entities.repository';
import { Request } from 'express';

@Injectable()
export class FormEntityGuard implements CanActivate {
  constructor(
    @Inject(FormEntitiesRepository)
    private readonly formEntitiesRepository: FormEntitiesRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const formId = request.params.formId;
    const entityId = request.params.entityId;

    if (!studyId) throw new UnauthorizedException();
    if (!formId) throw new UnauthorizedException();
    if (!entityId) return true;

    const formEntity = await this.formEntitiesRepository.findOne({
      where: { id: entityId, formId },
    });

    if (!formEntity) throw new UnauthorizedException();

    return true;
  }
}
