import { Provider } from '@nestjs/common';
import { PasswordService } from '@shared/modules/password/password.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { DirectorsRepository } from '@admin/directors/directors.repository';
import { EntityManager } from 'typeorm';
import { Director } from '@entities/director.entity';

const authProviders: Provider[] = [
  PasswordService,
  AuthService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide: DirectorsRepository,
    useFactory: (entityManager) =>
      new DirectorsRepository(Director, entityManager),
    inject: [EntityManager],
  },
];

export default authProviders;
