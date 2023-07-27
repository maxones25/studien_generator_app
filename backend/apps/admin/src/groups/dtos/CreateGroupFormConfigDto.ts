import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { IsBoolean, IsEnum } from 'class-validator';

export class CreateGroupFormConfigDto {
  @IsBoolean()
  isActive: boolean;

  @IsEnum(FormConfigType)
  type: FormConfigType;
}
