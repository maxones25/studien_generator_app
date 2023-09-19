import { Id, UpdatedResult, UseCase } from '@shared/modules/core';

export const SET_FORM_CONFIG_TIME_INDEPENDENT_USE_CASE =
  'SET_FORM_CONFIG_TIME_INDEPENDENT_USE_CASE';

export type SetFormConfigTimeIndependentUseCaseInput = {
  formConfigId: Id;
};

export interface ISetFormConfigTimeIndependentUseCase
  extends UseCase<
    SetFormConfigTimeIndependentUseCaseInput,
    Promise<UpdatedResult>
  > {}
