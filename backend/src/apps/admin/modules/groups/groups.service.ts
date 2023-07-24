import { Group } from '@entities/group.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dtos/CreateGroupDto';
import { UpdateGroupDto } from './dtos/UpdateGroupDto';
import { GroupsRepository } from './groups.repository';

@Injectable()
export class GroupsService {
  constructor(
    @Inject(GroupsRepository)
    private groupsRepository: GroupsRepository,
  ) {}

  async create(studyId: string, { name }: CreateGroupDto) {
    const group = new Group();

    group.name = name;
    group.studyId = studyId;

    await this.groupsRepository.insert(group);

    return group.id;
  }

  async getByStudy(studyId: string) {
    return this.groupsRepository.getById(studyId);
  }

  async getById(groupId: string) {
    return this.groupsRepository.getById(groupId);
  }

  async update(groupId: string, { name }: UpdateGroupDto) {
    const { affected } = await this.groupsRepository.update(groupId, { name });
    return affected;
  }

  async delete(id: string) {
    const { affected } = await this.groupsRepository.delete(id);
    return affected;
  }
}
