import { UseCase } from '@shared/modules/core';

export const CHANGE_PASSWORD_USE_CASE = 'CHANGE_PASSWORD_USE_CASE';

export type ChangePasswordInput = { directorId: string; password: string };

export interface IChangePasswordUseCase
  extends UseCase<ChangePasswordInput, Promise<number>> {}
