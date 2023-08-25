import { Provider } from '@nestjs/common';
import { RolesGuard } from './roles.guard';

const rolesProviders: Provider[] = [
  RolesGuard
];

export default rolesProviders;
