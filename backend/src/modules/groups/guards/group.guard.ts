import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { GroupsRepository } from '../groups.repository';

@Injectable()
export class GroupGuard implements CanActivate {
  constructor(
    @Inject(GroupsRepository)
    private groupRepository: GroupsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const groupId = request.params.groupId;

    if (!studyId) throw new UnauthorizedException();
    if (!groupId) true;

    const group = await this.groupRepository.findOne({
      where: { id: groupId, studyId },
    });

    if (!group) throw new UnauthorizedException();

    return true;
  }
}
