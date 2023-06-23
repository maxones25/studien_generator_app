import { IsString, IsNotEmpty } from 'class-validator';
import { Roles } from 'src/enums/roles.enum';

export class UpdateMemberDto {
  @IsString()
  @IsNotEmpty()
  readonly role: Roles;
}
