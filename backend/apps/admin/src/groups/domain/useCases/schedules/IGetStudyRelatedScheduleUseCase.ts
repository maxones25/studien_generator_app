import { IGetStudyRelatedDataUseCase } from '@shared/modules/records/StudyRelatedDataAccessor';

export const GET_STUDY_RELATED_SCHEDULE_USE_CASE =
  'GET_STUDY_RELATED_SCHEDULE_USE_CASE';

export type GetStudyRelatedScheduleUseCaseInput = {};

export interface IGetStudyRelatedScheduleUseCase
  extends IGetStudyRelatedDataUseCase {}
