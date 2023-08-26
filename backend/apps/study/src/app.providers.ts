import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmExceptionFilter } from '@shared/filters/exception/type-orm-exception.filter';
import { AuthGuard } from '@study/modules/auth/guards/auth.guard';
export const appProviders: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: TypeOrmExceptionFilter,
  },
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
];
