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

  async getByStudy(studyId: string) {
    return await this.groupsRepository.find({
      where: { studyId },
      select: {
        id: true,
        name: true,
      },
      order: { name: 'ASC' },
    });
  }

  async update(groupId: string, { name }: GroupDto) {
    console.log(groupId);
    return this.groupsRepository.update(groupId, { name });
  }

  async delete(groupId: string) {
    return await this.groupsRepository.delete({ id: groupId });
  }
}
