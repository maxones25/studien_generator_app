import { Group } from '../../entities/group.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from './dtos/CreateGroupDto';
import { UpdateGroupDto } from './dtos/UpdateGroupDto';
import { GroupsRepository } from './groups.repository';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
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
    return this.groupsRepository.getByStudy(studyId)
  }

  async update(groupId: string, { name }: UpdateGroupDto) {
    return this.groupsRepository.update(groupId, { name });
  }

  async delete(id: string) {
    return await this.groupsRepository.delete(id);
  }
}
