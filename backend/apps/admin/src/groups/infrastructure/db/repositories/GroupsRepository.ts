import { GroupSchema } from '@entities/schema';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { IGroupsRepository } from '@admin/Groups/domain';

export class GroupsRepository implements IGroupsRepository {
  constructor(
    @InjectRepository(GroupSchema)
    private readonly db: Repository<GroupSchema>,
  ) {}

  getRelatedByStudy(studyId: string, id: string) {
    return this.db.findOne({
      where: {
        id,
        studyId,
      },
    });
  }

  async getByStudy(studyId: string, deleted = false) {
    const deletedAt = deleted ? undefined : IsNull();
    return this.db.find({
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
    return this.db.findOne({
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
