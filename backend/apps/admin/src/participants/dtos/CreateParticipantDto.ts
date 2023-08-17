import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  @IsNotEmpty()
  readonly number: string;

  @IsOptional()
  @IsUUID()
  readonly groupId?: string;
}
