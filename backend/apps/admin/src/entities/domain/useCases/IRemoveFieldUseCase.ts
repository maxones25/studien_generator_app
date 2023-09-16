import { UseCase } from '@shared/modules/core/UseCase';

export const REMOVE_FIELD_USE_CASE = 'REMOVE_FIELD_USE_CASE';

export type RemoveFieldInput = { fieldId: string };

export interface IRemoveFieldUseCase
  extends UseCase<RemoveFieldInput, Promise<number>> {}
