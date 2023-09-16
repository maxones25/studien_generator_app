import { IGetStudyRelatedDataUseCase } from '@shared/modules/records/StudyRelatedDataAccessor';

export const GET_STUDY_RELATED_FIELD_USE_CASE =
  'GET_STUDY_RELATED_FIELD_USE_CASE';

export type GetStudyRelatedFieldUseCaseInput = {};

export interface IGetStudyRelatedFieldUseCase
  extends IGetStudyRelatedDataUseCase {}
