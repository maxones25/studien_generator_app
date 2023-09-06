import { Group as GroupEntity } from '@entities';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const GetGroup = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): GroupEntity => {
    const request = ctx.switchToHttp().getRequest();

    if (!request?.group) throw new UnauthorizedException();

    return request.group as GroupEntity;
  },
);
