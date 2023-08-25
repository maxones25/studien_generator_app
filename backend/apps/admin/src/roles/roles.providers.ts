import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

const rolesProviders: Provider[] = [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
];

export default rolesProviders;
