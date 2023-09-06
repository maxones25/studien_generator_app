import { Group } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import datetime from '@shared/modules/datetime/datetime';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { IsNull, Repository } from 'typeorm';

export class GroupsRepository extends RecordRepository<Group> {
  constructor(
    @InjectRepository(Group)
    db: Repository<Group>,
  ) {
    super(db);
  }

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
    return this.db.findOneOrFail({
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
