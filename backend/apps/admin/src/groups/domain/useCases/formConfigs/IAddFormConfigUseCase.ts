import { Id, UseCase } from '@shared/modules/core';

export const ADD_FORM_CONFIG_USE_CASE = 'ADD_FORM_CONFIG_USE_CASE';

export type AddFormConfigUseCaseInput = {
  studyId: Id;
  groupId: Id;
  formId: Id;
};

export interface IAddFormConfigUseCase
  extends UseCase<AddFormConfigUseCaseInput, Promise<Id>> {}
