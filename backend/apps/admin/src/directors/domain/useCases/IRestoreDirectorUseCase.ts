import { UseCase } from '@shared/modules/core';

export const RESTORE_DIRECTOR_USE_CASE = 'RESTORE_DIRECTOR_USE_CASE';

export type RestoreDirectorInput = {
  directorId: string;
};

export interface IRestoreDirectorUseCase
  extends UseCase<RestoreDirectorInput, Promise<number>> {}
