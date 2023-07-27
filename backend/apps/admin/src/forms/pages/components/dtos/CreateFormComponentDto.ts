import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FormComponentAttributeDto } from '../attributes/dtos/FormComponentAttributeDto';
import { ComponentType } from '@admin/components/component-type.enum';

export class FormFieldDto {
  @IsUUID()
  entityId: string;

  @IsUUID()
  fieldId: string;
}

export class CreateFormComponentDto {
  @IsEnum(ComponentType)
  type: ComponentType;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => FormFieldDto)
  @ValidateNested({ each: true })
  formFields: FormFieldDto[];

  @IsArray()
  @Type(() => FormComponentAttributeDto)
  @ValidateNested({ each: true })
  attributes: FormComponentAttributeDto[];
}
