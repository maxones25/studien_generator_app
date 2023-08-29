import { Transaction } from '@shared/modules/transaction/transaction';
import { FieldsRepository } from '../fields.repository';
import { EntityField } from '@entities';
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
    return await this.updateField(fieldId, data);
  }

  private async updateField(fieldId: string, { name, type }: UpdateFieldDto) {
    const repo = new FieldsRepository(
      this.entityManager.getRepository(EntityField),
    );

    return await repo.update(fieldId, { name, type });
  }
}
