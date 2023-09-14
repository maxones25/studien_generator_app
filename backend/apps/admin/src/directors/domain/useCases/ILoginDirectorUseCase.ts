import { UseCase } from '@shared/modules/core/UseCase';

export const LOGIN_DIRECTOR_USE_CASE = "LOGIN_DIRECTOR_USE_CASE"

export type LoginDirectorInput = {
  email: string;
  password: string;
};

export type LoginDirectorOutput = {
  accessToken: string;
};

export interface ILoginDirectorUseCase
  extends UseCase<LoginDirectorInput, Promise<LoginDirectorOutput>> {}
