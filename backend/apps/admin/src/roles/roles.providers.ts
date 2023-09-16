import { Provider } from '@nestjs/common';
import { RolesGuard } from '../members/infrastructure/http';

const rolesProviders: Provider[] = [RolesGuard];

export default rolesProviders;
