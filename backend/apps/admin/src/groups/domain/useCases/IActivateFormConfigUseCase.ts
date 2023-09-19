import { Id, UpdatedResult, UseCase } from '@shared/modules/core';

export const ACTIVATE_FORM_CONFIG_USE_CASE = 'ACTIVATE_FORM_CONFIG_USE_CASE';

export type ActivateFormConfigUseCaseInput = {
  formConfigId: Id;
};

export interface IActivateFormConfigUseCase
  extends UseCase<ActivateFormConfigUseCaseInput, Promise<UpdatedResult>> {}
