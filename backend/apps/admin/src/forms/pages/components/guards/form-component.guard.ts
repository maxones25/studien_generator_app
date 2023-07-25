import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormComponent } from '@entities/form-component.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class FormComponentGuard implements CanActivate {
  constructor(
    @InjectRepository(FormComponent)
    private readonly formComponentsRepository: Repository<FormComponent>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const formId = request.params.formId;
    const pageId = request.params.pageId;
    const componentId = request.params.componentId;

    if (!studyId || !formId || !pageId) throw new UnauthorizedException();
    if (!componentId) return true;

    const formComponent = await this.formComponentsRepository.findOne({
      where: { id: componentId, pageId, page: { formId, form: { studyId } } },
    });

    if(!formComponent) throw new UnauthorizedException()

    return true;
  }
}
