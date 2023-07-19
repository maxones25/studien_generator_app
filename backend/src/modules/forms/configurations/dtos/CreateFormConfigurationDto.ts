import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { FormConfigType } from '../../../../enums/form-config-type.enum';

export class CreateFormConfigurationDto {
  @IsBoolean()
  readonly isActive: boolean;

  @IsUUID()
  @IsOptional()
  readonly groupId?: string;

  @IsEnum(FormConfigType)
  readonly type: FormConfigType;
}
