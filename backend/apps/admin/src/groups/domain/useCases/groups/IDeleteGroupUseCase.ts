import { DeletedResult, Id, UseCase } from '@shared/modules/core';

export const DELETE_GROUP_USE_CASE = 'DELETE_GROUP_USE_CASE';

export type DeleteGroupUseCaseInput = {
  groupId: Id;
  hardDelete: boolean;
  deleteRelated: boolean;
};

export interface IDeleteGroupUseCase
  extends UseCase<DeleteGroupUseCaseInput, Promise<DeletedResult>> {}
