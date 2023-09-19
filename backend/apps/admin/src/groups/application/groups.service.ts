import { Inject, Injectable } from '@nestjs/common';
import { GroupsRepository } from '../repositories/groups.repository';

@Injectable()
export class GroupsService {
  constructor(
    @Inject(GroupsRepository)
    private groupsRepository: GroupsRepository,
  ) {}

  async getById(groupId: string) {
    return this.groupsRepository.getById(groupId);
  }
}
