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

  async isDeleted(id: string) {
    const group = await this.db.findOneBy({ id });
    if (!group) return true;
    return group.isDeleted;
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

  async softDelete(id: string) {
    const deletedAt = datetime.isoDateTime();
    return this.db.update(id, { deletedAt });
  }

  restore(id: string) {
    return this.db.update(id, { deletedAt: null });
  }
}
