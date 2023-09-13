import { UseCase } from '@shared/modules/core/UseCase';

export type RemoveFieldInput = { fieldId: string };

export interface IRemoveFieldUseCase
  extends UseCase<RemoveFieldInput, Promise<number>> {}
