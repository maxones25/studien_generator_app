import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FormPage } from '../../../../entities/form-page.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

@Injectable()
export class FormPageGuard implements CanActivate {
  constructor(
    @InjectRepository(FormPage)
    private readonly formPagesRepository: Repository<FormPage>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const formId = request.params.formId;
    const pageId = request.params.pageId;

    if (!studyId || !formId) throw new UnauthorizedException();
    if (!pageId) return true;

    const formPage = await this.formPagesRepository.findOne({
      where: { id: pageId, formId, form: { studyId } },
    });

    if(!formPage) throw new UnauthorizedException()
    
    return true;
  }
}
