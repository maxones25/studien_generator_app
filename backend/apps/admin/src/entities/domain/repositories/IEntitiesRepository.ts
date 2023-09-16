import { DeletedResult, Id, UpdatedResult } from '@shared/modules/core';
import { Entity } from '../models/Entity';

export const ENTITIES_REPOSITORY = 'ENTITIES_REPOSITORY';

export interface IEntitiesRepository {
  existsEntityName(studyId: Id, name: string): Promise<boolean>;
  getById(entityId: string): Promise<Entity>;
  getAll(studyId: string): Promise<Entity[]>;
  getRelatedByStudy(studyId: string, id: string): unknown;
  deleteEntity(entityId: string): Promise<DeletedResult>;
  updateEntity(entity: Entity): Promise<UpdatedResult>;
  createEntity(entity: Entity): Promise<Id>;
}
