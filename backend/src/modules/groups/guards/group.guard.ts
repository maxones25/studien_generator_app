import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../../../entities/group.entity';

@Injectable()
export class GroupGuard implements CanActivate {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = request.params.studyId;
    const groupId = request.params.groupId;

    if (!studyId) throw new UnauthorizedException();
    if (!groupId) true;

    const group = await this.groupRepository.findOne({ where: { id: groupId, studyId } });

    if(!group) throw new UnauthorizedException()

    return true;
  }
}
