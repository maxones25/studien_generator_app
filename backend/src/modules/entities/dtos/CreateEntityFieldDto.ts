import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FieldType } from '../../../enums/field-type.enum';

export class CreateEntityFieldDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(FieldType)
  readonly type: FieldType;
}
