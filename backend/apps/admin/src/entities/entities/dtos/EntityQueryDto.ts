import { IsUUID } from 'class-validator';

export class EntityQueryDto {
  @IsUUID()
  readonly entityId: string;
}
