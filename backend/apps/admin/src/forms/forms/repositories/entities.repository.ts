import { FormEntity } from '@entities/form-entity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { Repository } from 'typeorm';

export class EntitiesRepository extends RecordRepository<FormEntity> {
  constructor(
    @InjectRepository(FormEntity)
    db: Repository<FormEntity>,
  ) {
    super(db);
  }

  getById(id: string) {
    return this.db.findOne({ where: { id } });
  }

  getRelatedByStudy(studyId: string, id: string): Promise<any> {
    return this.db.findOne({ where: { id, form: { studyId } } });
  }

  async getByForm(formId: string) {
    const items = await this.db.find({
      where: {
        formId,
      },
      relations: {
        entity: {
          fields: true,
        },
        fields: {
          formComponent: true,
        },
      },
      select: {
        id: true,
        name: true,
        fields: {
          formComponent: {
            id: true,
            type: true,
          },
          entityFieldId: true,
        },
        entity: {
          id: true,
          name: true,
          fields: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    return items.map(
      ({
        entity: { fields: entityFields, ...entity },
        fields,
        ...formEntity
      }) => ({
        ...formEntity,
        entity,
        fields: entityFields.map((field) => ({
          ...field,
          component:
            fields.find((formfield) => formfield.entityFieldId === field.id)
              ?.formComponent ?? null,
        })),
      }),
    );
  }

  getByFormAndName(formId: string, name: string) {
    return this.db.findOne({
      where: {
        formId,
        name,
      },
    });
  }
}
