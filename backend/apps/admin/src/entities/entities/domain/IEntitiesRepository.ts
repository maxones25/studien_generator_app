import { Id } from '@shared/modules/core/Id';
import { CreateEntityDto } from './dtos/CreateEntityDto';
import { Entity } from '@entities';

export interface IEntitiesRepository {
  getById(entityId: string): Promise<Entity>;
  getAll(studyId: string): Promise<Entity[]>;
  getRelatedByStudy(studyId: string, id: string): Promise<Entity>;
  deleteEntity(entityId: string): Promise<number>;
  updateName(entityId: string, name: string): Promise<number>;
  createEntity(studyId: string, data: CreateEntityDto): Promise<Id>;
}
