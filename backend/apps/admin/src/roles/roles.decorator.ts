import { SetMetadata } from '@nestjs/common';
import { RoleType } from './roles.enum';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);