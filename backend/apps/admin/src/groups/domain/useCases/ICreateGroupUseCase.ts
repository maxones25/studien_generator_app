import { Group } from '@entities/core/group/Group';
import { Id, UseCase } from '@shared/modules/core';

export const CREATE_GROUP_USE_CASE = 'CREATE_GROUP_USE_CASE';

export type CreateGroupUseCaseInput = {
  data: Group;
};

export interface ICreateGroupUseCase
  extends UseCase<CreateGroupUseCaseInput, Promise<Id>> {}
