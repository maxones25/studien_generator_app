import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum FormPageType {
  Form = 'Form',
  PlugIn = 'PlugIn',
}

export enum FormComponent {
  TextField = 'TextField',
  NumberField = 'NumberField',
  Switch = 'Switch',
}

export class FormField {
  @IsUUID()
  fieldId: string;

  @IsString()
  label: string;

  @IsString()
  helpText: string;

  @IsEnum(FormComponent)
  component: FormComponent;
}

export class FormDataPage {
  @IsString()
  title: string;

  @IsEnum(FormPageType)
  type: FormPageType;

  @IsOptional()
  @IsEnum(FormComponent)
  component?: FormComponent;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  fields?: FormField[];
}

export class FormData {
  @IsString()
  title: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FormDataPage)
  pages: FormDataPage[];
}
