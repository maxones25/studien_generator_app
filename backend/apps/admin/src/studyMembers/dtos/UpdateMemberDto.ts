import { Roles } from '@admin/roles/roles.enum';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateMemberDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(Roles)
  readonly role: Roles;
}
