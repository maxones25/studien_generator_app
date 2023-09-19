import { Id, UseCase } from '@shared/modules/core';

export const CHANGE_GROUP_NAME_USE_CASE = 'CHANGE_GROUP_NAME_USE_CASE';

export type ChangeGroupNameUseCaseInput = {
  groupId: Id;
  name: string;
};

export interface IChangeGroupNameUseCase
  extends UseCase<ChangeGroupNameUseCaseInput, Promise<any>> {}
