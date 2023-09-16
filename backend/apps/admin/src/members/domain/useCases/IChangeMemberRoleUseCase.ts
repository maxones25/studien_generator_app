import { Role } from '@entities/core/study';
import { Id, UpdatedResult, UseCase } from '@shared/modules/core';

export const CHANGE_MEMBER_ROLE_USE_CASE = 'CHANGE_MEMBER_ROLE_USE_CASE';

export type ChangeMemberRoleUseCaseInput = {
  studyId: Id;
  directorId: Id;
  role: Role;
};

export interface IChangeMemberRoleUseCase
  extends UseCase<ChangeMemberRoleUseCaseInput, Promise<UpdatedResult>> {}
