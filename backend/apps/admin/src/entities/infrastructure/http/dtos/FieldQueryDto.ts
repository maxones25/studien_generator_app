import { IsUUID } from 'class-validator';

export class FieldQueryDto {
  @IsUUID()
  readonly fieldId: string;
}
