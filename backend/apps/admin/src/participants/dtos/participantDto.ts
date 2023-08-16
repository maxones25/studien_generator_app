import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class ParticipantDto {
  @IsString()
  @IsNotEmpty()
  readonly number: string;

  @IsOptional()
  @IsUUID()
  readonly groupId?: string;
}
