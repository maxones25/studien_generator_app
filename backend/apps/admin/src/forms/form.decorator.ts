import { Form as FormEntity } from '@entities';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const Form = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FormEntity => {
    const request = ctx.switchToHttp().getRequest();

    if (!request?.form) throw new UnauthorizedException();

    return request.form as FormEntity;
  },
);
