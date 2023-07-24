import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { StudiesRepository } from '../studies.repository';
import { Request } from 'express';

@Injectable()
export class StudyGuard implements CanActivate {
  constructor(
    @Inject(StudiesRepository)
    private readonly studiesRepository: StudiesRepository,
  ) {}

  async canActivate(context: ExecutionContext) {

    const request: Request = context.switchToHttp().getRequest()

    const studyId = request.params.studyId

    if(!studyId) return true

    const study = await this.studiesRepository.findOne({ where: { id: studyId } })

    if(!study) throw new UnauthorizedException()

    // @ts-ignore
    request.study = study

    return true;
  }
}
