import { Provider } from '@nestjs/common';
import { SIGN_UP_DIRECTOR_USE_CASE } from '../domain/useCases/ISignUpDirectorUseCase';
import { SignUpDirectorUseCase } from '../useCases/SignUpDirectorUseCase';
import {
  CONFIG_SERVICE,
  IConfigService,
} from '@shared/modules/config/IConfigService';
import {
  IPasswordService,
  PASSWORD_SERVICE,
} from '@shared/modules/password/IPasswordService';
import {
  DIRECTORS_REPOSITORY,
  IDirectorsRepository,
} from '../domain/repositories/IDirectorsRepository';

export const SignUpDirectorProvider: Provider = {
  provide: SIGN_UP_DIRECTOR_USE_CASE,
  useFactory(
    configService: IConfigService,
    directorsRepository: IDirectorsRepository,
    passwordService: IPasswordService,
  ) {
    return new SignUpDirectorUseCase(
      configService,
      directorsRepository,
      passwordService,
    );
  },
  inject: [CONFIG_SERVICE, DIRECTORS_REPOSITORY, PASSWORD_SERVICE],
};
