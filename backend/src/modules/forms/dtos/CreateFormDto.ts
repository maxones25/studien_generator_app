import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { FormData } from './FormData';
import { Type } from 'class-transformer';

export class CreateFormDto {
  @IsBoolean()
  readonly active: boolean;

  @IsOptional()
  @IsUUID()
  readonly groupId?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => FormData)
  readonly data: FormData;
}
