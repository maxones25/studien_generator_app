import { Provider } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { DirectorsRepository } from './directors.repository';
import { DirectorGuard } from './guards/director.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { PasswordService } from '@shared/modules/password/password.service';

const directorsProviders: Provider[] = [
  DirectorsService,
  DirectorGuard,
  DirectorsRepository,
  PasswordService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
];

export default directorsProviders;
