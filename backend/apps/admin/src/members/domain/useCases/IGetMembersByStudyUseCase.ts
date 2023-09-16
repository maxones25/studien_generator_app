import { UseCase } from '@shared/modules/core';
import { Member } from '@admin/members/domain';

export const GET_MEMBERS_BY_STUDY_USE_CASE = 'GET_MEMBERS_BY_STUDY_USE_CASE';

export type GetMembersByStudyUseCaseInput = {
  studyId: string;
};

export interface IGetMembersByStudyUseCase
  extends UseCase<GetMembersByStudyUseCaseInput, Promise<Member[]>> {}
