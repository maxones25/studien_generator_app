import {
  IEntitiesRepository,
  IUpdateFieldUseCase,
  InvalidFieldError,
  UpdateFieldInput,
} from '@admin/entities/domain';

export class UpdateFieldUseCase implements IUpdateFieldUseCase {
  constructor(private readonly entitiesRepository: IEntitiesRepository) {}

  async execute({ field }: UpdateFieldInput): Promise<number> {
    if(!field.isValid()) throw new InvalidFieldError()
    return await this.entitiesRepository.updateField(field);
  }
}
