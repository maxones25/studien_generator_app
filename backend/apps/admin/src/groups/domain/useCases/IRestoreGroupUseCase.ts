import { Id, UpdatedResult, UseCase } from '@shared/modules/core';

export const RESTORE_GROUP_USE_CASE = 'RESTORE_GROUP_USE_CASE';

export type RestoreGroupUseCaseInput = {
  groupId: Id;
};

export interface IRestoreGroupUseCase
  extends UseCase<RestoreGroupUseCaseInput, Promise<UpdatedResult>> {}
