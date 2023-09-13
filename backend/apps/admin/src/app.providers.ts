import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmExceptionFilter } from '@shared/filters/exception/type-orm-exception.filter';
import { AuthGuard } from './directors/guards/auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { IsDirectorDeletedGuard } from './directors/guards/IsDirectorDeletedGuard';
import { UseCaseErrorFilter } from '@shared/modules/core/UseCaseErrorFilter';

export const appProviders: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: TypeOrmExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: UseCaseErrorFilter,
  },
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: IsDirectorDeletedGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
];
