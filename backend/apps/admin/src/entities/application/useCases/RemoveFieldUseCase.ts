import {
  IEntitiesRepository,
  IRemoveFieldUseCase,
  RemoveFieldInput,
} from '@admin/entities/domain';
import { DeletedResult } from '@shared/modules/core';

export class RemoveFieldUseCase implements IRemoveFieldUseCase {
  constructor(private readonly entitiesRepository: IEntitiesRepository) {}

  execute({ fieldId }: RemoveFieldInput): Promise<DeletedResult> {
    return this.entitiesRepository.removeField(fieldId);
  }
}
