import { UseCase } from '@shared/modules/core/UseCase';
import { SignupDirectorDto } from '../dtos/SignupDirectorDto';

export type SignUpDirectorInput = {
  data: SignupDirectorDto;
};

export interface ISignUpDirectorUseCase
  extends UseCase<SignUpDirectorInput, Promise<string>> {}
