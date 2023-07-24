import { Provider } from '@nestjs/common';
import { PasswordService } from '@shared/modules/password/password.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

const authProviders: Provider[] = [
  PasswordService,
  AuthService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
];

export default authProviders;
