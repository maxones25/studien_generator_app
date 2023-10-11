import { Role } from '@entities/core/study';
import { Id, UseCase } from '@shared/modules/core';

export const ADD_MEMBER_USE_CASE = 'ADD_MEMBER_USE_CASE';

export type AddMemberUseCaseInput = {
  studyId: Id;
  directorId: Id;
  role: Role
};

export interface IAddMemberUseCase
  extends UseCase<AddMemberUseCaseInput, Promise<void>> {}
