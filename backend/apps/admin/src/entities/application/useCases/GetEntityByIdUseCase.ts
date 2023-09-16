import {
  Entity,
  GetEntityByIdUseCaseInput,
  IEntitiesRepository,
  IGetEntityByIdUseCase,
} from '@admin/entities/domain';

export class GetEntityByIdUseCase implements IGetEntityByIdUseCase {
  constructor(private readonly entitiesRepository: IEntitiesRepository) {}

  execute({ entityId }: GetEntityByIdUseCaseInput): Promise<Entity> {
    return this.entitiesRepository.getById(entityId);
  }
}
