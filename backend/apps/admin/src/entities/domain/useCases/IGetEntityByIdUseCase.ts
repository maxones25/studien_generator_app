import { Id, UseCase } from '@shared/modules/core';

export const GET_ENTITY_BY_ID_USE_CASE = 'GET_ENTITY_BY_ID_USE_CASE';

export type GetEntityByIdUseCaseInput = {
  entityId: Id;
};

export interface IGetEntityByIdUseCase
  extends UseCase<GetEntityByIdUseCaseInput, Promise<any>> {}
