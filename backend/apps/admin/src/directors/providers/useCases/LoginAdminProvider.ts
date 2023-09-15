import { Provider } from '@nestjs/common';
import { LOGIN_ADMIN_USE_CASE } from '../../domain';
import { LoginAdminUseCase } from '../../application/useCases/LoginAdminUseCase';
import {
  CONFIG_SERVICE,
  IConfigService,
} from '@shared/modules/config/IConfigService';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '@shared/modules/token/ITokenService';

export const LoginAdminProvider: Provider = {
  provide: LOGIN_ADMIN_USE_CASE,
  useFactory: (configService: IConfigService, tokenService: ITokenService) =>
    new LoginAdminUseCase(configService, tokenService),
  inject: [CONFIG_SERVICE, TOKEN_SERVICE],
};
