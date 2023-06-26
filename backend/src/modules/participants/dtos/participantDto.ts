import { IsString, IsNotEmpty } from 'class-validator';

export class ParticipantDto {
  @IsString()
  @IsNotEmpty()
  readonly number: string;
}
