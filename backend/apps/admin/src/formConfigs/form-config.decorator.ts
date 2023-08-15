import { FormConfiguration } from '@entities';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const FormConfig = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FormConfiguration => {
    const request = ctx.switchToHttp().getRequest();

    if (!request?.formConfig) throw new UnauthorizedException();

    return request.formConfig as FormConfiguration;
  },
);
