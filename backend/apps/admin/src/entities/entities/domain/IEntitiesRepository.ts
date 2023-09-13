import { Id } from '@shared/modules/core/Id';
import { CreateEntityDto } from '../dtos/CreateEntityDto';

export interface IEntitiesRepository {
  updateName(entityId: string, name: string): Promise<number>;
  createEntity(studyId: string, data: CreateEntityDto): Promise<Id>;
}
