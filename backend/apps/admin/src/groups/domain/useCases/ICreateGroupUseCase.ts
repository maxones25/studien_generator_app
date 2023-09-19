import { UseCase } from '@shared/modules/core';

export const CREATE_GROUP_USE_CASE = 'CREATE_GROUP_USE_CASE';

export type CreateGroupUseCaseInput = {};

export interface ICreateGroupUseCase
  extends UseCase<CreateGroupUseCaseInput, Promise<any>> {}
