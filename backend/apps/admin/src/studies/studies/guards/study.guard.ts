import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { StudiesRepository } from '../repositories/studies.repository';
import { StudiesService } from '../studies.service';

@Injectable()
export class StudyGuard implements CanActivate {
  constructor(
    @Inject(StudiesService)
    private readonly studiesService: StudiesService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const id = request.query.studyId;

    if (typeof id !== 'string') throw new UnauthorizedException();

    const study = await this.studiesService.getById(id);

    if (!study) throw new UnauthorizedException();

    (request as any).study = study;

    return true;
  }
}
