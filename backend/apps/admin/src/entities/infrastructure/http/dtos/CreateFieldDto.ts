import { FieldType } from '@shared/enums/field-type.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateFieldDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(FieldType)
  readonly type: FieldType;
}
