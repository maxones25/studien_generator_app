import { Id, UseCase } from '@shared/modules/core';

export const IS_DIRECTOR_DELETED_USE_CASE = 'IS_DIRECTOR_DELETED_USE_CASE';

export type IsDirectorDeletedUseCaseInput = { directorId: Id };

export interface IIsDirectorDeletedUseCase
  extends UseCase<IsDirectorDeletedUseCaseInput, Promise<boolean>> {}
