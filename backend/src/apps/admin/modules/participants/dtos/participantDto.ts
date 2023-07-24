import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class ParticipantDto {
  @IsString()
  @IsNotEmpty()
  readonly number: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  readonly groupId: string;
}
