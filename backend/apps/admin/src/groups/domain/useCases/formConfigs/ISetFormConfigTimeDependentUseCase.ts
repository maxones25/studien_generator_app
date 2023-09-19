import { Id, UpdatedResult, UseCase } from '@shared/modules/core';

export const SET_FORM_CONFIG_TIME_DEPENDENT_USE_CASE =
  'SET_FORM_CONFIG_TIME_DEPENDENT_USE_CASE';

export type SetFormConfigTimeDependentUseCaseInput = {
  formConfigId: Id;
};

export interface ISetFormConfigTimeDependentUseCase
  extends UseCase<
    SetFormConfigTimeDependentUseCaseInput,
    Promise<UpdatedResult>
  > {}
