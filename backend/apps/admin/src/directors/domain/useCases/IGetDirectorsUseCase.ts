import { Director } from '@entities/core/director';
import { UseCase } from '@shared/modules/core';

export const GET_DIRECTORS_USE_CASE = 'GET_DIRECTORS_USE_CASE';

export type GetDirectorsUseCaseInput = void;

export type GetDirectorsUseCaseOutput = Omit<Director, 'password'>[];

export interface IGetDirectorsUseCase
  extends UseCase<
    GetDirectorsUseCaseInput,
    Promise<GetDirectorsUseCaseOutput>
  > {}
