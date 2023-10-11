import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmExceptionFilter } from '@shared/filters/exception/type-orm-exception.filter';
import { AuthGuard } from './directors/infrastructure/http/guards/auth.guard';
import { IsDirectorDeletedGuard } from './directors/infrastructure/http/guards/IsDirectorDeletedGuard';
import { RolesGuard } from './studies/members/infrastructure/http';

export const appProviders: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: TypeOrmExceptionFilter,
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
