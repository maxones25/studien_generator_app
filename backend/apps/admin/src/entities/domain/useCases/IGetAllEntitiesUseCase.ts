import { Id, UseCase } from '@shared/modules/core';
import { Entity } from '@admin/entities/domain';

export const GET_ALL_ENTITIES_USE_CASE = 'GET_ALL_ENTITIES_USE_CASE';

export type GetAllEntitiesUseCaseInput = {
  studyId: Id;
};

export interface IGetAllEntitiesUseCase
  extends UseCase<GetAllEntitiesUseCaseInput, Promise<Entity[]>> {}
