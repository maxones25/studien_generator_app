import { IsString, IsNotEmpty } from 'class-validator';
import { Roles } from '@enums';

export class UpdateMemberDto {
  @IsString()
  @IsNotEmpty()
  readonly role: Roles;
}
