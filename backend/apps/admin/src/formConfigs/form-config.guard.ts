import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { FormConfigsRepository } from './form-configs.repository';

@Injectable()
export class FormConfigGuard implements CanActivate {
  constructor(
    @Inject(FormConfigsRepository)
    private readonly formConfigsRepository: FormConfigsRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const formConfigId = request.query.formConfigId;

    if (!studyId) throw new UnauthorizedException();
    if (typeof formConfigId !== 'string') throw new UnauthorizedException();

    const formConfig = await this.formConfigsRepository.findOne({
      where: { id: formConfigId, studyId },
    });

    if (!formConfig) throw new UnauthorizedException();

    (request as any).formConfig = formConfig;

    return true;
  }
}
