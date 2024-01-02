import { IsString, Length } from 'class-validator';

export class LoginParticipantDto {
  @IsString()
  readonly loginId: string;

  @IsString()
  @Length(8)
  readonly password: string;
}
