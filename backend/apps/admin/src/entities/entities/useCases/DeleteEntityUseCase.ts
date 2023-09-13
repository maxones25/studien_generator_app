import { Inject } from '@shared/modules/core/Inject';
import {
  DeleteEntityInput,
  IDeleteEntityUseCase,
} from '../domain/IDeleteEntityUseCase';
import { IEntitiesRepository } from '../domain/IEntitiesRepository';

export class DeleteEntityUseCase implements IDeleteEntityUseCase {
  constructor(
    @Inject('IEntitiesRepository')
    private readonly entitiesRepository: IEntitiesRepository,
  ) {}

  execute({ entityId }: DeleteEntityInput): Promise<number> {
    return this.entitiesRepository.deleteEntity(entityId);
  }
}
