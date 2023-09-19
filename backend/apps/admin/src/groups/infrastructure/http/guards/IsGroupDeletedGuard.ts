import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import {
  IIsGroupDeletedUseCase,
  IS_GROUP_DELETED_USE_CASE,
} from '@admin/Groups/domain';

@Injectable()
export class IsGroupDeletedGuard implements CanActivate {
  constructor(
    @Inject(IS_GROUP_DELETED_USE_CASE)
    private readonly isGroupDeletedUseCase: IIsGroupDeletedUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const groupId = this.getGroupId(request);

    const isDeleted = await this.isGroupDeletedUseCase.execute({ groupId });

    if (isDeleted) throw new UnauthorizedException('group is deleted');

    return true;
  }

  private getGroupId(request: Request) {
    if (typeof request.query.groupId === 'string') return request.query.groupId;
    throw new UnauthorizedException();
  }
}
