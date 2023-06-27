import { Group } from '../../entities/group.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupDto } from './dtos/groupDto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(studyId: string, { name }: GroupDto) {
    const group = new Group();
    group.name = name;
    group.studyId = studyId;
    await this.groupsRepository.insert(group);
    return group;
  }

  async update(groupId: string, { name }: GroupDto) {
    await this.groupsRepository.update({ id: groupId }, { name });
  }

  async delete(groupId: string) {
    await this.groupsRepository.delete({ id: groupId });
  }
}
