import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from '../../../entities/form.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class FormGuard implements CanActivate {
  constructor(
    @InjectRepository(Form)
    private readonly formsRepository: Repository<Form>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const formId = request.params.formId;

    if (!studyId) throw new UnauthorizedException();
    if (!formId) true;

    const form = await this.formsRepository.findOne({
      where: { studyId, id: formId },
    });

    if (!form) throw new UnauthorizedException();

    return true;
  }
}
