import { Provider } from '@nestjs/common';
import { PasswordService } from '@shared/modules/password/password.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

const authProviders: Provider[] = [
  PasswordService,
  AuthService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
];

export default authProviders;
