import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class GetByGroupQueryDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return true;
    return value;
  })
  readonly isActive?: boolean;

  @IsOptional()
  @IsEnum(FormConfigType)
  readonly type?: FormConfigType;
}
