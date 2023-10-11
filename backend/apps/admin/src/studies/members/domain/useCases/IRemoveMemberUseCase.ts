import { DeletedResult, Id, UseCase } from '@shared/modules/core';

export const REMOVE_MEMBER_USE_CASE = 'REMOVE_MEMBER_USE_CASE';

export type RemoveMemberUseCaseInput = {
  studyId: Id;
  directorId: Id;
};

export interface IRemoveMemberUseCase
  extends UseCase<RemoveMemberUseCaseInput, Promise<DeletedResult>> {}
