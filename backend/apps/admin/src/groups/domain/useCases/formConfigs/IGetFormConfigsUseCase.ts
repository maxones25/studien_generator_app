import { FormConfig, FormConfigType } from '@entities/core/group';
import { Id, UseCase } from '@shared/modules/core';

export const GET_FORM_CONFIGS_USE_CASE = 'GET_FORM_CONFIGS_USE_CASE';

export type GetFormConfigsUseCaseInput = {
  groupId: Id;
  type?: FormConfigType;
  isActive?: boolean;
};

export interface IGetFormConfigsUseCase
  extends UseCase<GetFormConfigsUseCaseInput, Promise<FormConfig[]>> {}
