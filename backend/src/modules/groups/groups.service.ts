import { Group } from '../../entities/group.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dtos/CreateGroupDto';
import { UpdateGroupDto } from './dtos/UpdateGroupDto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(studyId: string, { name }: CreateGroupDto) {
    const group = new Group();

    group.name = name;
    group.studyId = studyId;
    
    await this.groupsRepository.insert(group);
    
    return group.id;
  }

  async getByStudy(studyId: string) {
    return this.groupsRepository.find({
      where: { studyId },
      select: {
        id: true,
        name: true,
      },
      order: { name: 'ASC' },
    });
  }

  async update(groupId: string, { name }: UpdateGroupDto) {
    return this.groupsRepository.update(groupId, { name });
  }

  async delete(id: string) {
    return await this.groupsRepository.delete(id);
  }
}
