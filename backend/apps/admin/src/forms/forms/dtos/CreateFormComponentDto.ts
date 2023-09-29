import {
  IsArray,
  IsEnum,
  IsObject,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
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
  @Type(() => FormFieldDto)
  @ValidateNested({ each: true })
  formFields: FormFieldDto[];

  @IsObject()
  attributes: Record<string, any>;
}
