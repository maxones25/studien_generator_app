import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { FormsRepository } from '../forms.repository';

@Injectable()
export class QueryFormGuard implements CanActivate {
  constructor(
    @Inject(FormsRepository)
    private readonly formsRepository: FormsRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const formId = request.query.formId;

    if (!studyId) throw new UnauthorizedException();
    if (typeof formId !== 'string') throw new UnauthorizedException();

    const form = await this.formsRepository.findOne({
      where: { studyId, id: formId },
    });

    if (!form) throw new UnauthorizedException();

    (request as any).form = form;

    return true;
  }
}
