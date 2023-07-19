import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { FieldType } from '../../../../enums/field-type.enum';

export class CreateEntityFieldDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(FieldType)
  readonly type: FieldType;

  @IsOptional()
  @IsUUID()
  readonly groupId?: string;
}
