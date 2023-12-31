import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class IsAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const topic = request.payload.topic;

    if (topic !== 'Admin') throw new UnauthorizedException();

    return true;
  }
}
