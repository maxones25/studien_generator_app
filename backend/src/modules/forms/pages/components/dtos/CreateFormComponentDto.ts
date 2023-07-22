import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ComponentType } from '../../../../../enums/component-type.enum';
import { Type } from 'class-transformer';
import { FormComponentAttributeDto } from '../attributes/dtos/FormComponentAttributeDto';

export class FormFieldDto {
  @IsUUID()
  entityFieldId: string;
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
