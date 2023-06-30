import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Roles } from '../../../enums/roles.enum';

export class UpdateMemberDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(Roles)
  readonly role: Roles;
}
