import { Inject } from '@shared/modules/core/Inject';
import { IFieldsRepository } from '../domain/IFieldsRepository';
import {
  IUpdateFieldUseCase,
  UpdateFieldInput,
} from '../domain/IUpdateFieldUseCase';

export class UpdateFieldUseCase implements IUpdateFieldUseCase {

    constructor(
        @Inject("IFieldsRepository")
        private readonly fieldsRepository: IFieldsRepository,
    ) {}

  async execute({ fieldId, data }: UpdateFieldInput): Promise<number> {
    return await this.fieldsRepository.updateField(fieldId, data);
  }
}
