import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { IGetStudyRelatedDataUseCase } from './StudyRelatedDataAccessor';

export type ValidateOptions = {
  studyId: string;
  id: string;
  params: Record<string, any>;
};

export abstract class RecordGuard implements CanActivate {
  constructor(
    private readonly useCase: IGetStudyRelatedDataUseCase,
    private readonly record: string,
    private readonly paramName: string,
    private readonly variant: 'query' | 'path' | 'both' = 'query',
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = this.getStudyId(request);

    const id = this.getId(request);

    if (typeof id !== 'string')
      throw new BadRequestException(`${this.paramName} required`);

    const item = await this.useCase.execute(studyId, id);

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

  private getId(request: Request) {
    if (
      this.variant === 'query' ||
      (this.variant === 'both' &&
        typeof request.query[this.paramName] === 'string')
    )
      return request.query[this.paramName];
    if (
      this.variant === 'path' ||
      (this.variant === 'both' &&
        typeof request.params[this.paramName] === 'string')
    )
      return request.params[this.paramName];
    return undefined;
  }
}
