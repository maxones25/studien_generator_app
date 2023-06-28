import { IsString, IsNotEmpty } from 'class-validator';
import { Roles } from '../../../enums/roles.enum';

export class UpdateMemberDto {
  @IsString()
  @IsNotEmpty()
  readonly role: Roles;
}
