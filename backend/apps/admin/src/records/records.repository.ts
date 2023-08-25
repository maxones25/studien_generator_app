import { Record } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { Repository } from 'typeorm';

export class RecordsRepository extends RecordRepository<Record> {
  constructor(
    @InjectRepository(Record)
    db: Repository<Record>,
  ) {
    super(db);
  }

  getByEntity(entityId: string) {
    return this.db.find({
      where: { fields: { entityField: { entityId } } },
      relations: {
        fields: { entityField: { entity: true } },
        form: true,
        task: true,
        participant: true,
      },
      select: {
        id: true,
        form: {
          id: true,
          name: true,
        },
        participant: {
          id: true,
          number: true,
        },
        task: {
          id: true,
          completedAt: true,
        },
        fields: {
          entityField: {
            id: true,
            name: true,
            entity: {
              id: true,
              name: true,
            },
          },
        },
      },
    });
  }
}
