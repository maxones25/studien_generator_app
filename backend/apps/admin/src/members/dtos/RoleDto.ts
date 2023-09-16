import { Roles } from '@admin/roles/roles.enum';
import { IsEnum } from 'class-validator';

export class RoleDto {
  @IsEnum(Roles)
  readonly role: Roles;
}
