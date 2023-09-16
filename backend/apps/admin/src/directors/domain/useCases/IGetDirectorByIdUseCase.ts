import { UseCase } from '@shared/modules/core';
import { Director } from '..';

export const GET_DIRECTOR_BY_ID_USE_CASE = 'GET_DIRECTOR_BY_ID_USE_CASE';

export type GetDirectorByIdUseCaseInput = {
  directorId: string;
};

export interface IGetDirectorByIdUseCase
  extends UseCase<GetDirectorByIdUseCaseInput, Promise<Director>> {}
