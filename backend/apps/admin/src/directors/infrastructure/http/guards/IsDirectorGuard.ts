import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class IsDirectorGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const topic = request.payload.topic;

    if (topic !== 'Director') throw new UnauthorizedException();

    return true;
  }
}
