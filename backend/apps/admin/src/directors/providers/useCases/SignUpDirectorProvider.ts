import { Provider } from '@nestjs/common';
import { SignUpDirectorUseCase } from '../../application';
import { CONFIG_SERVICE, IConfigService } from '@shared/modules/config';
import { IPasswordService, PASSWORD_SERVICE } from '@shared/modules/password';
import {
  DIRECTORS_REPOSITORY,
  SIGN_UP_DIRECTOR_USE_CASE,
  IDirectorsRepository,
} from '../../domain';

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
