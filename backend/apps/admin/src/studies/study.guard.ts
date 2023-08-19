import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { StudiesRepository } from './repositories/studies.repository';

@Injectable()
export class StudyGuard implements CanActivate {
  constructor(
    @Inject(StudiesRepository)
    private readonly studiesRepository: StudiesRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const id = request.query.studyId;

    if (typeof id !== 'string') throw new UnauthorizedException();

    const study = await this.studiesRepository.findOne({
      where: { id },
    });

    if (!study) throw new UnauthorizedException();

    (request as any).study = study;

    return true;
  }
}
