import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { StudiesService } from '../../../application';

@Injectable()
export class StudyGuard implements CanActivate {
  constructor(
    @Inject(StudiesService)
    private readonly studiesService: StudiesService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const id = this.getStudyId(request);

    const study = await this.studiesService.getById(id);

    if (!study) throw new UnauthorizedException();

    (request as any).study = study;

    return true;
  }

  private getStudyId(request: Request) {
    if (typeof request.query.studyId === 'string') return request.query.studyId;
    if (typeof request.params.studyId === 'string')
      return request.params.studyId;
    throw new UnauthorizedException();
  }
}
