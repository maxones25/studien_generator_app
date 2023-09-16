import { Id } from '@shared/modules/core/Id';
import {
  AddFieldInput,
  IAddFieldUseCase,
  IEntitiesRepository,
} from '@admin/entities/domain';

export class AddFieldUseCase implements IAddFieldUseCase {
  constructor(private readonly entitiesRepository: IEntitiesRepository) {}

  async execute({ field }: AddFieldInput): Promise<Id> {
    return await this.entitiesRepository.addField(field);
  }
}
