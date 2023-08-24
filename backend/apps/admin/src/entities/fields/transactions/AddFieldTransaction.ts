import { Transaction } from '@shared/modules/transaction/transaction';
import { FieldsRepository } from '../repositories/fields.repository';
import {
  EntityField,
  EntityFieldAttribute,
  EntityFieldAttributes,
} from '@entities';
import { CreateFieldDto } from '../dtos/CreateFieldDto';
import { FieldType } from '@shared/enums/field-type.enum';
import {
  AttributeKey,
  AttributeValue,
} from '@shared/modules/records/attribute.repository';
import { AttributesRepository } from '../repositories/attributes.repository';

type AddFieldInput = {
  entityId: string;
  data: CreateFieldDto;
};

export class AddFieldTransaction extends Transaction<AddFieldInput, string> {
  protected async execute({ entityId, data }: AddFieldInput): Promise<string> {
    const field = await this.addField(entityId, data);

    if (data.type === FieldType.Enum) {
      this.addAttribute(field.id, 'values', data.values);
    }

    return field.id;
  }

  private async addField(entityId: string, { name, type }: CreateFieldDto) {
    const repo = new FieldsRepository(
      this.entityManager.getRepository(EntityField),
    );

    return await repo.create({ entityId, name, type });
  }

  private async addAttribute<Key extends AttributeKey<EntityFieldAttributes>>(
    fieldId: string,
    key: Key,
    value: AttributeValue<EntityFieldAttributes, Key>,
  ) {
    const repo = new AttributesRepository(
      this.entityManager.getRepository(EntityFieldAttribute),
    );
    return await repo.set(fieldId, key, value);
  }
}
