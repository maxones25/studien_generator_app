import { Director } from '@entities/core/director';
import { CreateDto } from '@entities/modules/core/CreateEntityDto';
import { UseCase } from '@shared/modules/core/UseCase';

export const SIGN_UP_DIRECTOR_USE_CASE = 'SIGN_UP_DIRECTOR_USE_CASE';

export type SignUpDirectorInput = {
  activationPassword: string;
  data: CreateDirectorDto;
};

export type CreateDirectorDto = CreateDto<Director>;

export interface ISignUpDirectorUseCase
  extends UseCase<SignUpDirectorInput, Promise<string>> {}
