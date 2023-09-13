import { Inject } from '@shared/modules/core/Inject';
import {
  CreateEntityInput,
  ICreateEntityUseCase,
} from '../domain/ICreateEntityUseCase';
import { IEntitiesRepository } from '../domain/IEntitiesRepository';
import { Id } from '@shared/modules/core/Id';

export class CreateEntityUseCase implements ICreateEntityUseCase {
  constructor(
    @Inject('IEntitiesRepository')
    private readonly entitiesRepository: IEntitiesRepository,
  ) {}

  async execute({ studyId, data }: CreateEntityInput): Promise<Id> {
    return await this.entitiesRepository.createEntity(studyId, data)
  }
}
