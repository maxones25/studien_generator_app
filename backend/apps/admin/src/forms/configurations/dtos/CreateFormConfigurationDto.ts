import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class CreateFormConfigurationDto {
  @IsBoolean()
  readonly isActive: boolean;

  @IsUUID()
  @IsOptional()
  readonly groupId?: string;

  @IsEnum(FormConfigType)
  readonly type: FormConfigType;
}
