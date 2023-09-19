import { Group } from '@entities/core/group';
import { Id, UseCase } from '@shared/modules/core';

export const REMOVE_FORM_CONFIG_USE_CASE = 'REMOVE_FORM_CONFIG_USE_CASE';

export type RemoveFormConfigUseCaseInput = {
  formConfigId: Id;
};

export interface IRemoveFormConfigUseCase
  extends UseCase<RemoveFormConfigUseCaseInput, Promise<Group>> {}
