import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { GroupsService } from '../groups.service';

@Injectable()
export class IsGroupDeletedGuard implements CanActivate {
  constructor(
    @Inject(GroupsService)
    private readonly groupsService: GroupsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const id = this.getGroupId(request);

    const isDeleted = await this.groupsService.isDeleted(id);

    if (isDeleted) throw new UnauthorizedException('group is deleted');

    return true;
  }

  private getGroupId(request: Request) {
    if (typeof request.query.groupId === 'string') return request.query.groupId;
    throw new UnauthorizedException();
  }
}
