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

  getRelatedByStudy(studyId: string, id: string) {
    return this.groups.findOne({
      where: {
        id,
        studyId,
      },
    });
  }

  async getByStudy(studyId: string, deleted = false) {
    const deletedAt = deleted ? undefined : IsNull();
    return this.groups.find({
      where: {
        studyId,
        deletedAt,
      },
      select: {
        id: true,
        name: true,
        deletedAt: true,
      },
      order: {
        deletedAt: 'ASC',
        name: 'ASC',
      },
    });
  }

  async getById(id: string) {
    return this.groups.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
