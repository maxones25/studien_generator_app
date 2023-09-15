import { UseCase } from '@shared/modules/core';

export const DELETE_DIRECTOR_USE_CASE = 'DELETE_DIRECTOR_USE_CASE';

export type DeleteDirectorInput = {
  directorId: string;
  hardDelete: boolean;
};

export interface IDeleteDirectorUseCase
  extends UseCase<DeleteDirectorInput, Promise<number>> {}
