import { Provider } from '@nestjs/common';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '@shared/modules/token/ITokenService';
import { LOGIN_DIRECTOR_USE_CASE } from '../../domain';
import { LoginDirectorUseCase } from '../../application/useCases/LoginDirectorUseCase';
import {
  DIRECTORS_REPOSITORY,
  IDirectorsRepository,
} from '../../domain/repositories/IDirectorsRepository';
import {
  IPasswordService,
  PASSWORD_SERVICE,
} from '@shared/modules/password/IPasswordService';

export const LoginDirectorProvider: Provider = {
  provide: LOGIN_DIRECTOR_USE_CASE,
  useFactory: (
    directorsRepository: IDirectorsRepository,
    passwordService: IPasswordService,
    tokenService: ITokenService,
  ) =>
    new LoginDirectorUseCase(
      directorsRepository,
      passwordService,
      tokenService,
    ),
  inject: [DIRECTORS_REPOSITORY, PASSWORD_SERVICE, TOKEN_SERVICE],
};
