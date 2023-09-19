import { Id, UseCase } from '@shared/modules/core';

export const IS_GROUP_DELETED_USE_CASE = 'IS_GROUP_DELETED_USE_CASE';

export type IsGroupDeletedUseCaseInput = {
  groupId: Id;
};

export interface IIsGroupDeletedUseCase
  extends UseCase<IsGroupDeletedUseCaseInput, Promise<boolean>> {}
