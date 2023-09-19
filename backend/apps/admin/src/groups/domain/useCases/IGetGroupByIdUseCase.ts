import { Group } from '@entities/core/group';
import { Id, UseCase } from '@shared/modules/core';

export const GET_GROUP_BY_ID_USE_CASE = 'GET_GROUP_BY_ID_USE_CASE';

export type GetGroupByIdUseCaseInput = {
  groupId: Id;
};

export interface IGetGroupByIdUseCase
  extends UseCase<GetGroupByIdUseCaseInput, Promise<Group>> {}
