import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const IsInitial = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): boolean => {
    const request = ctx.switchToHttp().getRequest();
    if (!request?.payload?.isInitial) throw new UnauthorizedException();

    return request.payload.isInitial as boolean;
  },
);
