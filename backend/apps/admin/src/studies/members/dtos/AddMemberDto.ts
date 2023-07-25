import { Roles } from '@admin/roles/roles.enum';
import { IsString, IsNotEmpty } from 'class-validator';

export class AddMemberDto {
  @IsString()
  @IsNotEmpty()
  readonly directorId: string;

  @IsString()
  @IsNotEmpty()
  readonly role: Roles;
}
