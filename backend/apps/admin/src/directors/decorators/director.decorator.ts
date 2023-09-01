import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Director as DirectorEntity } from '@entities';

export const Director = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): DirectorEntity => {
    const request = ctx.switchToHttp().getRequest();

    console.log(request.director)

    if (!request?.director) throw new UnauthorizedException();

    return request.director as DirectorEntity;
  },
);
