import { Id, UseCase } from '@shared/modules/core';

export const DEACTIVATE_FORM_CONFIG_USE_CASE =
  'DEACTIVATE_FORM_CONFIG_USE_CASE';

export type DeactivateFormConfigUseCaseInput = {
  formConfigId: Id;
};

export interface IDeactivateFormConfigUseCase
  extends UseCase<DeactivateFormConfigUseCaseInput, Promise<any>> {}
