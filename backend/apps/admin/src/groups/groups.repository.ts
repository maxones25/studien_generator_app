import { Group } from '@entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { Repository } from 'typeorm';

export class GroupsRepository extends RecordRepository<Group> {
  constructor(
    @InjectRepository(Group)
    db: Repository<Group>,
  ) {
    super(db);
  }

  getRelatedByStudy(studyId: string, id: string) {
    return this.db.findOne({ where: { id, studyId } });
  }

  async getByStudy(studyId: string) {
    return this.db.find({
      where: { studyId },
      select: {
        id: true,
        name: true,
      },
      order: { name: 'ASC' },
    });
  }

  async getById(id: string) {
    return this.db.findOneOrFail({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
