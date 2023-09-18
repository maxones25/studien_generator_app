import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { StudiesService } from '../studies.service';

export class IsStudyDeletedGuard implements CanActivate {
  constructor(
    @Inject(StudiesService)
    private readonly studiesService: StudiesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (request.path === '/studies/restore') return true;

    const id = this.getStudyId(request);

    const isDeleted = await this.studiesService.isDeleted(id);

    if (isDeleted) throw new UnauthorizedException('study is read only');

    return true;
  }

  private getStudyId(request: Request) {
    if (typeof request.query.studyId === 'string') return request.query.studyId;
    if (typeof request.params.studyId === 'string')
      return request.params.studyId;
    throw new UnauthorizedException();
  }
}
