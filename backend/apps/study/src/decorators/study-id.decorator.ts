import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const StudyId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    if (!request?.payload?.studyId) throw new UnauthorizedException();

    return request.payload.studyId as string;
  },
);
