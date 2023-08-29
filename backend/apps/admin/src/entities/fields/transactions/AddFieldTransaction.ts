import { Transaction } from '@shared/modules/transaction/transaction';
import { FieldsRepository } from '../fields.repository';
import { EntityField } from '@entities';
import { CreateFieldDto } from '../dtos/CreateFieldDto';

type AddFieldInput = {
  entityId: string;
  data: CreateFieldDto;
};

export class AddFieldTransaction extends Transaction<AddFieldInput, string> {
  protected async execute({ entityId, data }: AddFieldInput): Promise<string> {
    const field = await this.addField(entityId, data);

    return field.id;
  }

  private async addField(entityId: string, { name, type }: CreateFieldDto) {
    const repo = new FieldsRepository(
      this.entityManager.getRepository(EntityField),
    );

    return await repo.create({ entityId, name, type });
  }
}
