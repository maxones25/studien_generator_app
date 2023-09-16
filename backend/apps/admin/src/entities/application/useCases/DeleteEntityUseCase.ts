import {
  DeleteEntityInput,
  IDeleteEntityUseCase,
  IEntitiesRepository,
} from '@admin/entities/domain';

export class DeleteEntityUseCase implements IDeleteEntityUseCase {
  constructor(private readonly entitiesRepository: IEntitiesRepository) {}

  execute({ entityId }: DeleteEntityInput): Promise<number> {
    return this.entitiesRepository.deleteEntity(entityId);
  }
}
