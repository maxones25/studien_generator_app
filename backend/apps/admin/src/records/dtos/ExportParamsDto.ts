import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RecordsQueryDto } from './RecordsQueryDto';
import { Type } from 'class-transformer';

export class TableColumnDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;
}

export class ExportParamsDto extends RecordsQueryDto {
  @IsArray()
  @IsObject({ each: true })
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => TableColumnDto)
  readonly columns: TableColumnDto[];
}
