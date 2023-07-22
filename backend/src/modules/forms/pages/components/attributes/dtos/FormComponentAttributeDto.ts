import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class FormComponentAttributeDto {
  @IsString()
  @IsNotEmpty()
  readonly key: string;

  @IsDefined()
  readonly value: any;
}
