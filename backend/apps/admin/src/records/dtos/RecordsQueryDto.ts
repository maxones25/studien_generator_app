import { IsOptional, IsUUID } from 'class-validator';

export class RecordsQueryDto {
  @IsOptional()
  @IsUUID()
  readonly entityId?: string;

  @IsOptional()
  @IsUUID()
  readonly participantId?: string;

  @IsOptional()
  @IsUUID()
  readonly groupId?: string;

  @IsOptional()
  @IsUUID()
  readonly formId?: string;
}
