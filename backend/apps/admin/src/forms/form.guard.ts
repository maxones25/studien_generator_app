import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { FormsRepository } from './forms.repository';

@Injectable()
export class FormGuard implements CanActivate {
  constructor(
    @Inject(FormsRepository)
    private readonly formsRepository: FormsRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const formId = request.params.formId;

    if (!studyId) throw new UnauthorizedException();
    if (!formId) return true;

    const form = await this.formsRepository.findOne({
      where: { studyId, id: formId },
    });

    if (!form) throw new UnauthorizedException();

    return true;
  }
}
