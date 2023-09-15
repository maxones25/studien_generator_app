import { ChangePasswordUseCase } from '@admin/directors/application';
import {
  CHANGE_PASSWORD_USE_CASE,
  DIRECTORS_REPOSITORY,
  IDirectorsRepository,
} from '@admin/directors/domain';
import { Provider } from '@nestjs/common';
import { PASSWORD_SERVICE } from '@shared/modules/password';
import { IPasswordService } from '@shared/modules/password';

export const ChangePasswordProvider: Provider = {
  provide: CHANGE_PASSWORD_USE_CASE,
  useFactory(
    directorsRepository: IDirectorsRepository,
    passwordService: IPasswordService,
  ) {
    return new ChangePasswordUseCase(directorsRepository, passwordService);
  },
  inject: [DIRECTORS_REPOSITORY, PASSWORD_SERVICE],
};
