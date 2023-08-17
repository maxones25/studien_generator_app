import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const createRecordDecorator = (recordName: string) =>
  createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    if (!request[recordName]) throw new UnauthorizedException();

    return request[recordName];
  });
