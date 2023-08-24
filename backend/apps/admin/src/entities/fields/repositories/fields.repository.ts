import { EntityField, EntityFieldAttributes } from '@entities';
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

  async getByEntity(
    entityId: string,
  ): Promise<(Omit<EntityField, 'attributes'> & EntityFieldAttributes)[]> {
    const fields = await this.db.find({
      where: {
        entityId,
      },
      order: {
        createdAt: 'ASC',
      },
      relations: {
        attributes: true,
      },
      select: {
        id: true,
        name: true,
        type: true,
        attributes: {
          key: true,
          value: true,
        },
      },
    });
    return fields.map(({ attributes, ...field }) => ({
      ...field,
      ...attributes.reduce<EntityFieldAttributes>((obj, attribute) => {
        obj[attribute.key] = attribute.value;
        return obj;
      }, {}),
    }));
  }
}
