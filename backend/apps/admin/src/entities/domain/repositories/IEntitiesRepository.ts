import { DeletedResult, Id, UpdatedResult } from '@shared/modules/core';
import { Entity, Field } from '@admin/entities/domain';

export const ENTITIES_REPOSITORY = 'ENTITIES_REPOSITORY';

export interface IEntitiesRepository {
  existsEntityName(studyId: Id, name: string): Promise<boolean>;
  getById(entityId: string): Promise<Entity>;
  getAll(studyId: string): Promise<Entity[]>;
  getEntityByStudy(studyId: string, id: string): Promise<Entity>;
  getFieldByStudy(studyId: string, id: string): Promise<Field>;
  deleteEntity(entityId: string): Promise<DeletedResult>;
  updateEntity(entity: Entity): Promise<UpdatedResult>;
  createEntity(entity: Entity): Promise<Id>;
  removeField(fieldId: string): Promise<DeletedResult>;
  updateField(field: Field): Promise<number>;
  addField(field: Field): Promise<Id>;
  getFieldsByEntity(entityId: Id): Promise<Field[]>;
}
