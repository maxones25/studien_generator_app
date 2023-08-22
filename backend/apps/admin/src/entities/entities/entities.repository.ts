import { Repository } from 'typeorm';
import { Entity } from '@entities';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { InjectRepository } from '@nestjs/typeorm';

export class EntitiesRepository extends RecordRepository<Entity> {
  constructor(
    @InjectRepository(Entity)
    db: Repository<Entity>,
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

  getAll(studyId: string) {
    return this.db.find({
      where: {
        studyId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getById(entityId: string) {
    return this.db.findOne({
      where: {
        id: entityId,
      },
      relations: {
        fields: true,
      },
      select: {
        id: true,
        name: true,
        fields: {
          id: true,
          name: true,
          type: true,
        },
      },
    });
  }
}
