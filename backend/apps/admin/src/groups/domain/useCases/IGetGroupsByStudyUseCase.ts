import { Group } from '@entities/core/group';
import { Id, UseCase } from '@shared/modules/core';

export const GET_GROUPS_BY_STUDY_USE_CASE = 'GET_GROUPS_BY_STUDY_USE_CASE';

export type GetGroupsByStudyUseCaseInput = {
  studyId: Id;
  deleted: boolean;
};

export interface IGetGroupsByStudyUseCase
  extends UseCase<GetGroupsByStudyUseCaseInput, Promise<Group[]>> {}
