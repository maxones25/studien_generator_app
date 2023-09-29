import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { StudiesService } from '../../../application';
import { Request } from 'express';

export class IsStudyActiveGuard implements CanActivate {
  constructor(
    @Inject(StudiesService)
    private readonly studiesService: StudiesService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.query.studyId as string;

    const isActive = await this.studiesService.isActive(studyId);

    if (!isActive) throw new BadRequestException('study must be active');

    return true;
  }
}
