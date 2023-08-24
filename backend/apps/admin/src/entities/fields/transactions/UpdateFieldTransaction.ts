import { Transaction } from '@shared/modules/transaction/transaction';
import { FieldsRepository } from '../repositories/fields.repository';
import {
  EntityField,
  EntityFieldAttribute,
  EntityFieldAttributes,
} from '@entities';
import { FieldType } from '@shared/enums/field-type.enum';
import {
  AttributeKey,
  AttributeValue,
} from '@shared/modules/records/attribute.repository';
import { AttributesRepository } from '../repositories/attributes.repository';
import { UpdateFieldDto } from '../dtos/UpdateFieldDto';

type UpdateFieldInput = {
  fieldId: string;
  data: UpdateFieldDto;
};

export class UpdateFieldTransaction extends Transaction<
  UpdateFieldInput,
  number
> {
  protected async execute({
    fieldId,
    data,
  }: UpdateFieldInput): Promise<number> {
    const affected = await this.updateField(fieldId, data);

    await this.removeAttributes(fieldId);

    if (data.type === FieldType.Enum) {
      this.addAttribute(fieldId, 'values', data.values);
    }

    return affected;
  }

  private async updateField(fieldId: string, { name, type }: UpdateFieldDto) {
    const repo = new FieldsRepository(
      this.entityManager.getRepository(EntityField),
    );

    return await repo.update(fieldId, { name, type });
  }

  private async removeAttributes(fieldId: string) {
    const repo = new AttributesRepository(
      this.entityManager.getRepository(EntityFieldAttribute),
    );
    return await repo.removeAll(fieldId);
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
