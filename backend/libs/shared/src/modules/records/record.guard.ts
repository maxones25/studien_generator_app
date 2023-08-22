import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { StudyRelatedDataAccessor } from './StudyRelatedDataAccessor';

export type ValidateOptions = {
  studyId: string;
  id: string;
  params: Record<string, any>;
};

export abstract class RecordGuard implements CanActivate {
  constructor(
    private readonly accessor: StudyRelatedDataAccessor,
    private readonly record: string,
    private readonly paramName: string,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = this.getStudyId(request);

    const id = request.query[this.paramName];

    if (typeof id !== 'string')
      throw new BadRequestException(`${this.paramName} required`);

    const item = await this.accessor.getRelatedByStudy(studyId, id);

    if (!item) throw new UnauthorizedException();

    (request as any)[this.record] = item;

    return true;
  }

  private getStudyId(request: Request) {
    if (typeof request?.params?.studyId === 'string')
      return request.params.studyId;
    if (typeof request?.query?.studyId === 'string')
      return request.query.studyId;
    throw new UnauthorizedException();
  }
}
