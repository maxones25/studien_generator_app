import { FormEntity } from '@entities/form-entity.entity';
import { Repository } from 'typeorm';

export class FormEntitiesRepository extends Repository<FormEntity> {
  async getAll(formId: string) {
    const items = await this.find({
      where: {
        formId,
      },
      relations: {
        entity: {
          fields: true,
        },
        fields: true,
      },
      select: {
        id: true,
        name: true,
        fields: {
          formComponentId: true,
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
          componentId:
            fields.find((formfield) => formfield.entityFieldId === field.id)
              ?.formComponentId ?? null,
        })),
      }),
    );
  }
}
