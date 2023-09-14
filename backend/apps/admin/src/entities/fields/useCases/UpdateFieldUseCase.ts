import { Inject } from '@shared/modules/core/Inject';
import { IFieldsRepository } from '../domain/IFieldsRepository';
import {
  IUpdateFieldUseCase,
  UpdateFieldInput,
} from '../domain/IUpdateFieldUseCase';
import { UseCaseError } from '@shared/modules/core/UseCaseError';
import { BadRequestException } from '@nestjs/common';

export class UpdateFieldUseCase implements IUpdateFieldUseCase {
  constructor(
    @Inject('IFieldsRepository')
    private readonly fieldsRepository: IFieldsRepository,
  ) {}

  async execute({ fieldId, data }: UpdateFieldInput): Promise<number> {
    if (Object.keys(data).length === 0) throw new BadRequestException();
    // if (Object.keys(data).length === 0) throw new UseCaseError('data required');
    return await this.fieldsRepository.updateField(fieldId, data);
  }
}
