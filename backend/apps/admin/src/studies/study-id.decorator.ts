import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { Request } from 'express';

export const StudyId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request: Request = ctx.switchToHttp().getRequest();

    if (!request?.params?.studyId) throw new UnauthorizedException();

    const studyId = request.params.studyId;

    if (!validateUUID(studyId)) throw new UnauthorizedException();

    return studyId;
  },
);
