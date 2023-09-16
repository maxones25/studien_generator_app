import { UseCase } from '@shared/modules/core';
import { Director } from '@admin/directors/domain';

export const GET_DIRECTORS_NOT_MEMBER_OF_STUDY_USE_CASE =
  'GET_DIRECTORS_NOT_MEMBER_OF_STUDY_USE_CASE';

export type GetDirectorsNotMemberOfStudyUseCaseInput = {
  studyId: string;
};

export interface IGetDirectorsNotMemberOfStudyUseCase
  extends UseCase<
    GetDirectorsNotMemberOfStudyUseCaseInput,
    Promise<Director[]>
  > {}
