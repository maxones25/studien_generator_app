import { Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmExceptionFilter } from '@shared/filters/exception/type-orm-exception.filter';

export const appProviders: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: TypeOrmExceptionFilter,
  },
];
