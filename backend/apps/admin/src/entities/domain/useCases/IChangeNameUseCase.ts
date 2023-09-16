import { UseCase } from '@shared/modules/core/UseCase';

export const CHANGE_ENTITY_NAME_USE_CASE = 'CHANGE_ENTITY_NAME_USE_CASE';

export type ChangeEntityNameInput = {
  studyId: string;
  entityId: string;
  name: string;
};

export interface IChangeEntityNameUseCase
  extends UseCase<ChangeEntityNameInput, Promise<number>> {}
