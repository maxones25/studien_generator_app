import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class ReorderFormPagesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
