import { IsArray, IsOptional } from 'class-validator';

export class FieldData {
  @IsArray()
  @IsOptional()
  readonly enum?: string[];
}
