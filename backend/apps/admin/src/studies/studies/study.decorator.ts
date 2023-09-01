import { Study } from '@entities';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const StudyParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Study => {
    const request = ctx.switchToHttp().getRequest();

    if (!request?.study) throw new UnauthorizedException();

    return request.study as Study;
  },
);
