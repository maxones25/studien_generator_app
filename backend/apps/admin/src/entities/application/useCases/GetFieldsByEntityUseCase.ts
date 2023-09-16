import {
  Field,
  GetFieldsByEntityUseCaseInput,
  IEntitiesRepository,
  IGetFieldsByEntityUseCase,
} from '@admin/entities/domain';

export class GetFieldsByEntityUseCase implements IGetFieldsByEntityUseCase {
  constructor(private readonly entitiesRepository: IEntitiesRepository) {}

  execute({ entityId }: GetFieldsByEntityUseCaseInput): Promise<Field[]> {
    return this.entitiesRepository.getFieldsByEntity(entityId);
  }
}
