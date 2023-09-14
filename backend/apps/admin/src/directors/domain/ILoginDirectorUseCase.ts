import { UseCase } from '@shared/modules/core/UseCase';

export type LoginDirectorInput = {
  email: string;
  password: string;
};

export type LoginDirectorOutput = {
  accessToken: string;
};

export interface ILoginDirectorUseCase
  extends UseCase<LoginDirectorInput, Promise<LoginDirectorOutput>> {}
