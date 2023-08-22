import { EntityField } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { Repository } from 'typeorm';

export class FieldsRepository extends RecordRepository<EntityField> {
  constructor(
    @InjectRepository(EntityField)
    db: Repository<EntityField>,
  ) {
    super(db);
  }

  getRelatedByStudy(studyId: string, id: string) {
    return this.db.findOne({ where: { id, entity: { studyId } } });
  }

  getByEntity(entityId: string) {
    return this.db.find({
      where: {
        entityId,
      },
      order: {
        createdAt: 'ASC',
      },
      select: {
        id: true,
        name: true,
        type: true,
      },
    });
  }
}
