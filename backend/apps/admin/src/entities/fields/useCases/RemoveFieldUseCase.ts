import { Inject } from '@shared/modules/core/Inject';
import { IFieldsRepository } from '../domain/IFieldsRepository';
import {
  IRemoveFieldUseCase,
  RemoveFieldInput,
} from '../domain/IRemoveFieldUseCase';

export class RemoveFieldUseCase implements IRemoveFieldUseCase {
  constructor(
    @Inject('IFieldsRepository')
    private readonly fieldsRepository: IFieldsRepository,
  ) {}

  execute({ fieldId }: RemoveFieldInput): Promise<number> {
    return this.fieldsRepository.deleteField(fieldId);
  }
}
