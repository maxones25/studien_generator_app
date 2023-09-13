import { Inject } from '@shared/modules/core/Inject';
import { AddFieldInput, IAddFieldUseCase } from '../domain/IAddFieldUseCase';
import { IFieldsRepository } from '../domain/IFieldsRepository';
import { Id } from '@shared/modules/core/Id';

export class AddFieldUseCase implements IAddFieldUseCase {
  constructor(
    @Inject('IFieldsRepository')
    private readonly fieldsRepository: IFieldsRepository,
  ) {}

  async execute({ data, entityId }: AddFieldInput): Promise<Id> {
    return await this.fieldsRepository.createField(entityId, data);
  }
}
