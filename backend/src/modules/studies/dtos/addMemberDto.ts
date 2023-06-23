import { IsString, IsNotEmpty } from 'class-validator';
import { Roles } from '@enums';

export class AddMemberDto {
  @IsString()
  @IsNotEmpty()
  readonly directorId: string;

  @IsString()
  @IsNotEmpty()
  readonly role: Roles;
}
