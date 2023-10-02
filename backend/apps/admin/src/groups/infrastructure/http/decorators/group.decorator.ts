import { Group as GroupEntity } from '@entities';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetGroup = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): GroupEntity => {
    const request = ctx.switchToHttp().getRequest();

    return request.group as GroupEntity;
  },
);
