import { Group } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { IsNull, Repository } from 'typeorm';

export class GroupsRepository extends RecordRepository<Group> {
  constructor(
    @InjectRepository(Group)
    db: Repository<Group>,
  ) {
    super(db);
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
