import { UseCase } from '@shared/modules/core/UseCase';
import { SignupDirectorDto } from '../dtos/SignupDirectorDto';

export const SIGN_UP_DIRECTOR_USE_CASE = 'SIGN_UP_DIRECTOR_USE_CASE';

export type SignUpDirectorInput = {
  data: SignupDirectorDto;
};

export interface ISignUpDirectorUseCase
  extends UseCase<SignUpDirectorInput, Promise<string>> {}
