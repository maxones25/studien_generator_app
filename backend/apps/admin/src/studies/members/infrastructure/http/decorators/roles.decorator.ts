import { SetMetadata } from '@nestjs/common';
import { Role } from '@entities/core/study';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
