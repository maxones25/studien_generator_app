import { IsString, IsNotEmpty } from 'class-validator';
import { Roles } from 'src/enums/roles.enum';

export class TransferAdminDto {
  @IsString()
  @IsNotEmpty()
  readonly role: Roles;
}
