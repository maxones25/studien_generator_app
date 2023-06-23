import { Group } from '../../../entities/group.entity';
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
    await this.groupsRepository.insert({ studyId, name });
  }

  async update(groupId: string, updatedGroup: GroupDto) {
    await this.groupsRepository.update({ id: groupId }, updatedGroup);
  }

  async delete(groupId: string) {
    await this.groupsRepository.delete({ id: groupId });
  }
}
