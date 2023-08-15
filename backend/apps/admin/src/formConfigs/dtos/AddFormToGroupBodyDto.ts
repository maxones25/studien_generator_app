import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { IsBoolean, IsEnum } from 'class-validator';

export class AddFormToGroupBodyDto {
  @IsBoolean()
  readonly isActive: boolean;

  @IsEnum(FormConfigType)
  readonly type: FormConfigType;
}
