import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginParticipantDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @Length(12)
  readonly password: string;
}
