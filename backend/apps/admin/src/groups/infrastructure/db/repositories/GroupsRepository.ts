import { GroupSchema } from '@entities/schema';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { IGroupsRepository } from '@admin/Groups/domain';
import { Group } from '@entities/core/group';
import { TypeOrmRepository } from '@shared/modules/db';

export class GroupsRepository implements IGroupsRepository {
  private readonly groups: TypeOrmRepository<GroupSchema>;

  constructor(
    @InjectRepository(GroupSchema)
    groups: Repository<GroupSchema>,
  ) {
    this.groups = new TypeOrmRepository(groups);
  }

  async createGroup(group: Group): Promise<string> {
    await this.groups.create(group);
    return group.id;
  }

  async changeGroupName({ id, name }: Group): Promise<number> {
    return await this.groups.update(id, { name });
  }

  async hardDeleteGroup(groupId: string): Promise<number> {
    return this.groups.hardDelete(groupId);
  }

  async softDeleteGroup(groupId: string): Promise<number> {
    return this.groups.softDelete(groupId);
  }

  async restoreGroup(groupId: string): Promise<number> {
    return this.groups.restore(groupId);
  }

  async getGroupById(groupId: string): Promise<Group> {
    return this.groups.findOne({
      where: {
        id: groupId,
        deletedAt: IsNull(),
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async isGroupDeleted(groupId: string): Promise<boolean> {
    return this.groups.isDeleted(groupId);
  }

  async getGroupByStudy(studyId: string, id: string): Promise<Group> {
    return this.groups.findOne({
      where: {
        id,
        studyId,
      },
    });
  }

  async getGroupsByStudy(studyId: string, deleted: boolean): Promise<Group[]> {
    const deletedAt = deleted ? undefined : IsNull();
    return this.groups.find({
      where: {
        studyId,
        deletedAt,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        modifiedAt: true,
        deletedAt: true,
      },
      order: {
        deletedAt: 'ASC',
        name: 'ASC',
      },
    });
  }
}
