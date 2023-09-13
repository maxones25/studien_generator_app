import { Id } from '@shared/modules/core/Id';
import { CreateFieldDto } from './dtos/CreateFieldDto';
import { UpdateFieldDto } from './dtos/UpdateFieldDto';

export interface IFieldsRepository {
  deleteField(fieldId: string): Promise<number>;
  updateField(fieldId: string, data: UpdateFieldDto): Promise<number>;
  createField(entityId: string, data: CreateFieldDto): Promise<Id>;
}
