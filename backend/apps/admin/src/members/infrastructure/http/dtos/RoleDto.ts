import { Roles } from '@entities/core/study';
import { IsEnum } from 'class-validator';

export class RoleDto {
  @IsEnum(Roles)
  readonly role: Roles;
}
