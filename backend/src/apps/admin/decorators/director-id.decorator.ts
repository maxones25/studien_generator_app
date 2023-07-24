import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const DirectorId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    console.log('p', request?.payload);

    if (!request?.payload?.directorId) throw new UnauthorizedException();

    return request.payload.directorId as string;
  },
);
