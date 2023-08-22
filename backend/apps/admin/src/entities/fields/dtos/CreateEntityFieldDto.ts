import { FieldType } from '@shared/enums/field-type.enum';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateEntityFieldDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(FieldType)
  readonly type: FieldType;

  @ValidateIf(({ type }) => type === FieldType.Enum)
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @MinLength(1, { each: true })
  readonly values: string[];
}
