import { Form } from '@entities/core/form';
import { Id, UseCase } from '@shared/modules/core';

export const GET_AVAILABLE_FORMS_BY_GROUP_USE_CASE =
  'GET_AVAILABLE_FORMS_BY_GROUP_USE_CASE';

export type GetAvailableFormsByGroupUseCaseInput = {
  studyId: Id;
  groupId: Id;
};

export interface IGetAvailableFormsByGroupUseCase
  extends UseCase<GetAvailableFormsByGroupUseCaseInput, Promise<Form[]>> {}
