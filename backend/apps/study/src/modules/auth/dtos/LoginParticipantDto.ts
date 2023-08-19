import { IsString, IsUUID, Length } from 'class-validator';

export class LoginParticipantDto {
  @IsUUID()
  readonly id: string;

  @IsString()
  @Length(12)
  readonly password: string;
}
