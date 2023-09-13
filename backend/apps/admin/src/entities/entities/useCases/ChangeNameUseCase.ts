import { Inject } from '@shared/modules/core/Inject';
import {
  ChangeNameInput,
  IChangeNameUseCase,
} from '../domain/IChangeNameUseCase';
import { IEntitiesRepository } from '../domain/IEntitiesRepository';

export class ChangeNameUseCase implements IChangeNameUseCase {
  constructor(
    @Inject('IEntitiesRepository')
    private readonly entitiesRepository: IEntitiesRepository,
  ) {}

  execute({ entityId, name }: ChangeNameInput): Promise<number> {
    return this.entitiesRepository.updateName(entityId, name)
  }
}
